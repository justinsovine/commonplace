<?php

namespace App\Http\Controllers;

use App\Models\Space;
use Illuminate\Http\Request;

class SpaceController extends Controller
{
    // convert this to model
    private $listOfSpaces = [
        [
            'img' => '/img/test.jpg',
            'name' => 'Eastwood Room (Performance Hall)',
            'description' => 'A 75-seat black box theater with flexible staging. Ideal for performances, speaker events, film screenings, and rehearsals. Includes basic AV setup, dimmable lighting, and stackable chairs for reconfiguration.',
        ],
        [
            'img' => '/img/test.jpg',
            'name' => 'Loft Studio (Art & Workshop Space)',
            'description' => 'Located on the top floor with ample skylights and industrial sinks. Designed for hands-on workshops, art classes, pottery, or fiber arts. Equipped with folding tables, easels, and open storage for short-term material use.',
        ],
        [
            'img' => '/img/test.jpg',
            'name' => 'Linden Room (Meeting & Multi-Use Space)',
            'description' => 'A clean, multi-purpose space with whiteboard walls and stackable furniture. Used for public lectures, book clubs, civic meetings, small classes, and tutoring. Quiet, well-lit, and adjacent to restrooms and a kitchenette.',
        ],
    ];

    public function index(Request $request) {
        return response()->json([
            'message' => 'List of all available spaces',
            'spaces' => $this->listOfSpaces,
        ]);
    }

    public function show(Request $request, int $space) {
        return response()->json([
            'message' => 'Details about a single space',
            'id' => $space, // convert this to Eloquent binding
        ]);
    }
}
