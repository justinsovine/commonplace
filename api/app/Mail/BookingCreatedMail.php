<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingCreatedMail extends Mailable
{
    use Queueable, SerializesModels;

    public Booking $booking; // Added explicit type for clarity

    /**
     * Create a new message instance.
     *
     * @param Booking $booking
     * @return void
     */
    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
    }

    /**
     * Get the message envelope.
     *
     * @return Envelope
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Booking Confirmation: ' . $this->booking->id // Dynamically set the subject based on booking ID
        );
    }

    /**
     * Get the message content definition.
     *
     * @return Content
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.booking-created', // The Blade view used for the email
            with: [
                'booking' => $this->booking, // Pass the booking data to the view
            ]
        );
    }

    /**
     * Get the attachments for the message (if any).
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        // Add any attachments in the future if necessary
        return [];
    }
}
