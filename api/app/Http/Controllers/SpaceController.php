<?php

namespace App\Http\Controllers;

use App\Models\Space;
use Illuminate\Http\Request;

class SpaceController extends Controller
{
    public function index(Request $request) {
        return response()->json([
            'message' => 'List of all available spaces',
        ]);
    }

    public function show(Request $request, int $space) {
        return response()->json([
            'message' => 'Details about a single space',
            'id' => $space, // convert this to Eloquent binding
        ]);
    }
}
