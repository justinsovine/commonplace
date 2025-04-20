<?php

namespace App\Http\Controllers;

use App\Models\Space;
use Illuminate\Http\Request;

class SpaceController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            'message' => 'List of all available spaces',
            'code' => 200,
            'status' => 'OK',
            'data' => [
                'spaces' => Space::all(),
            ],
            'errors' => null
        ], 200);
    }

    public function show(Request $request, Space $space)
    {
        return response()->json([
            'message' => 'Details about a single space',
            'code' => 200,
            'status' => 'OK',
            'data' => [
                'space' => $space,
            ],
            'errors' => null
        ], 200);
    }
}
