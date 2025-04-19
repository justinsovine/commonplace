<?php

namespace App\Http\Controllers;

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
            'bookings' => $bookings,
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
            'bookings' => $bookings,
        ]);
    }

    /**
     * Store a newly created booking in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'space_id' => 'required|exists:spaces,id', // checks to see if it exists in `spaces` table by `id`
            'status' => 'in:pending,confirmed,cancelled',
            //'user_id' => 'required|exists:users,id',
            'start_time' => 'required|date|after:now',
            'end_time' => 'required|date|after:start_time',
        ]);

        // Create a booking
        $booking = Booking::create($validated);

        return response()->json([
            'message' => 'Booking created successfully',
            'booking' => $booking,
        ], 201); // Status 201 Created
    }
}
