<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Space;

class SpaceSeeder extends Seeder
{

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed spaces
        $spaces = [
            [
                'name' => 'Eastwood Room (Performance Hall)',
                'description' => 'A 75-seat black box theater with flexible staging. Ideal for performances, speaker events, film screenings, and rehearsals. Includes basic AV setup, dimmable lighting, and stackable chairs for reconfiguration.',
                'image' => '/images/performance-hall.jpg',
            ],
            [
                'name' => 'Loft Studio (Art & Workshop Space)',
                'description' => 'Located on the top floor with ample skylights and industrial sinks. Designed for hands-on workshops, art classes, pottery, or fiber arts. Equipped with folding tables, easels, and open storage for short-term material use.',
                'image' => '/images/performance-hall.jpg',
            ],
            [
                'name' => 'Linden Room (Meeting & Multi-Use Space)',
                'description' => 'A clean, multi-purpose space with whiteboard walls and stackable furniture. Used for public lectures, book clubs, civic meetings, small classes, and tutoring. Quiet, well-lit, and adjacent to restrooms and a kitchenette.',
                'image' => '/images/performance-hall.jpg',
            ],
        ];
        
        foreach ($spaces as $space) {  
            // Create starting spaces
            // To-do: Create wizard install to choose whether or not to seed   
            Space::create($space);
        }
    }
}
