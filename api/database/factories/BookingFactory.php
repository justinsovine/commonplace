<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Space;
//use App\Models\User
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'space_id' => Space::inRandomOrder()->first()->id, // Random space
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'canceled']),
            //'user_id' => User::inRandomOrder()->first()->id,  // Random user
            'start_time' => $this->faker->dateTimeBetween('now', '+1 week'),
            'end_time' => $this->faker->dateTimeBetween('+1 hour', '+2 weeks'),
        ];
    }
}
