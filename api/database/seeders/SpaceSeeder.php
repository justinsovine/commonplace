<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Space;

class SpaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $spaces = [
            [
                'name' => 'Eastwood Performance Hall',
                'description' => 'A 75-seat black box theater ideal for performances, speaker events, and rehearsals. Includes flexible staging, dimmable lighting, AV setup, and stackable seating for dynamic use.',
                'image' => '/images/performance-hall.jpg',
            ],
            [
                'name' => 'Studio A – Skylight Room',
                'description' => 'A bright studio filled with natural light from overhead skylights. Designed for drawing, painting, and general creative workshops. Includes easels, tables, and a storage cabinet.',
                'image' => '/images/studio-a.jpg',
            ],
            [
                'name' => 'Studio B – Pottery & Clay',
                'description' => 'Equipped with industrial sinks and durable surfaces, this studio is ideal for pottery, clay sculpting, and material-heavy workshops. Features open shelving and large worktables.',
                'image' => '/images/studio-b.jpg',
            ],
            [
                'name' => 'Studio C – Fiber & Craft Room',
                'description' => 'Outfitted for fiber arts, this cozy studio includes large tables, yarn racks, fabric cutters, and basic storage. Perfect for quilting, knitting circles, and material-based crafts.',
                'image' => '/images/studio-c.jpg',
            ],
            [
                'name' => 'Studio D – Mixed Media Lab',
                'description' => 'A flexible workshop space with folding tables and movable walls for group projects, collaborative work, or media experimentation. Great for open-ended classes or pop-ups.',
                'image' => '/images/studio-d.jpg',
            ],
            [
                'name' => 'Linden Room',
                'description' => 'A calm, clean space with whiteboard walls, stackable chairs, and optional tables. Used for small lectures, civic meetings, tutoring sessions, and public conversations.',
                'image' => '/images/room-a.jpg',
            ],
            [
                'name' => 'Grove Room',
                'description' => 'A multi-use room ideal for quiet gatherings, writing workshops, book clubs, or breakout groups. Includes a kitchenette nearby and modular seating options.',
                'image' => '/images/room-b.jpg',
            ],
        ];

        foreach ($spaces as $space) {
            Space::create($space);
        }
    }
}
