<?php

namespace App\Http\Controllers;

use App\Models\Space;
use Illuminate\Http\Request;

class SpaceController extends Controller
{
    public function index(Request $request) {
        return response()->json([
            'message' => 'List of all available spaces',
            'spaces' => Space::all(),
        ]);
    }

    // Uses "route model binding" to inject a model into controller method based on id in the route
    public function show(Request $request, Space $space) {
        return response()->json([
            'message' => 'Details about a single space',
            'space' => $space,
        ]);
    }
}
