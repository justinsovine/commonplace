<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Space;
//use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create test bookings
        //$user = User::first();
        $space = Space::first(); // Assumes at least one space has been seeded

        Booking::factory()->count(10)->create();
    }
}
