<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Space extends Model
{
    /** @use HasFactory<\Database\Factories\SpaceFactory> */
    use HasFactory;
    protected $fillable = [
        'name', 
        'description', 
        'image'
    ];

    /**
     * Get all bookings for this space
     */
    public function bookings() {
        return $this->hasMany(Booking::class);
    }

}
