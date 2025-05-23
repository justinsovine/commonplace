<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Space;

class Booking extends Model
{
    /** @use HasFactory<\Database\Factories\BookingFactory> */
    use HasFactory;

    // By default, Laravel prevents mass-assignment vulnerabilities by not allowing any attributes to be filled unless explicitly stated
    protected $fillable = [
        //'space_id', 'user_id', 'start_time', 'end_time', 'status'
        'space_id', 'status', 'start_time', 'end_time'
    ];

    /**
     * Get the space that owns the booking
     */
    public function space() {
        return $this->belongsTo(Space::class);
    }

    /**
     * Get the user that owns the booking
     */
    // public function user() {
    //     return $this->belongsTo(User::class);
    // }
}
