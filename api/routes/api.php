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

// Create a new booking
Route::post('/bookings', [BookingController::class, 'store']);