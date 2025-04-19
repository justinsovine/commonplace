<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SpaceController;

// Get all spaces
Route::get('/spaces', [SpaceController::class, 'index']);

// Get a single space by ID
Route::get('/spaces/{space}', [SpaceController::class, 'show']);
