<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/spaces', function (Request $request) {
    return response()->json([
        'message' => 'List of all available spaces',
    ]);
});

Route::get('/spaces/{space}', function (Request $request, $space) {
    return response()->json([
        'message' => 'Details about a single space',
        'id' => $space,
    ]);
});
