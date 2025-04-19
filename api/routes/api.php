<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SpaceController;

Route::get('/spaces', [SpaceController::class, 'index']);

Route::get('/spaces/{space}', [SpaceController::class, 'show']);
