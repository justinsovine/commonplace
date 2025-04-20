<?php

namespace Database\Factories;

use App\Models\Space;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    public function definition(): array
    {
        // Create a start time between now and 1 week from now
        $start = $this->faker->dateTimeBetween('now', '+1 week');

        // Create an end time at least 1 hour after the start time, up to 2 days later
        $end = (clone $start)->modify('+' . rand(1, 48) . ' hours');

        return [
            'space_id' => Space::inRandomOrder()->first()->id, // Random space
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'cancelled']), // British spelling
            //'user_id' => User::inRandomOrder()->first()->id,
            'start_time' => $start,
            'end_time' => $end,
        ];
    }
}
