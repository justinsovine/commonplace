<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;

class BookingConflictException extends Exception
{
    protected $message = 'This space is already booked for the selected time period.';
    protected $code = 409;

    public function __construct($message = null, $code = null)
    {
        if ($message) {
            $this->message = $message;
        }

        if ($code) {
            $this->code = $code;
        }

        parent::__construct($this->message, $this->code);
    }

    public function render(Request $request)
    {
        return response()->json([
            'message' => $this->message,        // Human-readable message
            'code' => $this->code,              // HTTP or app-specific error code
            'status' => 'Conflict',             // Optional HTTP status label
            'errors' => null                    // Placeholder for future details
        ], $this->code);
    }
}
