<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SpaceController;
use App\Http\Controllers\BookingController;

// Get all spaces
Route::get('/spaces', [SpaceController::class, 'index']);

// Get a single space by ID
Route::get('/spaces/{space}', [SpaceController::class, 'show']);

// List all bookings
Route::get('/bookings', [BookingController::class, 'index']);

// List all bookings by space
//Route::get('/bookings/{space}', [BookingController::class, 'show']);
Route::get('/spaces/{space}/bookings', [BookingController::class, 'show']);

// Create a new booking
Route::post('/bookings', [BookingController::class, 'store']);