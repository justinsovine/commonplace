<?php

namespace App\Http\Controllers;

use App\Exceptions\BookingConflictException;
use App\Models\Booking;
use App\Models\Space;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Display a listing of the bookings.
     */
    public function index()
    {
        //$bookings = Booking::with('space', 'user')->get();
        $bookings = Booking::with('space')->get(); // eager load space
        return response()->json([
            'message' => 'List of all bookings',
            'code' => 200,
            'status' => 'OK',
            'data' => [
                'bookings' => $bookings,
            ],
            'errors' => null,
        ]);
    }

    /**
     * Display a listing of the bookings by space
     * Note: Uses "route model binding" to inject a model into controller method based on id in the route
     */
    public function show(Request $request, Space $space)
    {
        $bookings = $space->bookings;
        return response()->json([
            'message' => 'List of all bookings by space',
            'code' => 200,
            'status' => 'OK',
            'data' => [
                'bookings' => $bookings,
            ],
            'errors' => null,
        ]);
    }

    /**
     * Store a newly created booking in storage.
     */
    public function store(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'space_id' => 'required|exists:spaces,id',
            'status' => 'in:pending,confirmed,cancelled',
            'start_time' => 'required|date|after:now',
            'end_time' => 'required|date|after:start_time',
        ]);

        // Check for conflicts in booking
        // Filter bookings by space_id from the validated input
        $conflict = Booking::where('space_id', $validated['space_id']) 
            // Only consider bookings that are 'pending' or 'confirmed'
            ->whereIn('status', ['pending', 'confirmed']) 
            // Group the following conditions together
            ->where(function ($query) use ($validated) { 
                // Check if the new booking's start time is within any existing booking's time range
                $query->whereBetween('start_time', [$validated['start_time'], $validated['end_time']])
                    // Check if the new booking's end time overlaps with any existing booking's time range 
                    ->orWhereBetween('end_time', [$validated['start_time'], $validated['end_time']]) 
                    // Nested condition to check for full overlap
                    ->orWhere(function ($query) use ($validated) { 
                        // Check if the existing booking starts before the new booking
                        $query->where('start_time', '<=', $validated['start_time']) 
                            // Check if the existing booking ends after the new booking
                            ->where('end_time', '>=', $validated['end_time']); 
                    });
            })->exists(); // Check if any bookings meet the conditions (returns true if a conflict exists)

        // If a conflict is found throw conflict exception
        if ($conflict) { 
            throw new BookingConflictException();
        }

        // Create the booking if no conflict
        $booking = Booking::create($validated);

        return response()->json([
            'message' => 'Booking created successfully',
            'code' => 201,
            'status' => 'Created',
            'data' => [
                'booking' => $booking,
            ],
            'errors' => null,
        ], 201); // HTTP 201 Created
    }
}
