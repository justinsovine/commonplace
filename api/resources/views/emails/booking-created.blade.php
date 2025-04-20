<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Booking Confirmation</title>
</head>
<body>
    <h1>Booking Confirmation</h1>

    <p>Your booking for <strong>{{ $booking->space->name }}</strong> has been successfully created.</p>
    
    <!-- Format the start time and end time using PHP's date() and strtotime() -->
    <p><strong>Start Time:</strong> {{ date('l, F j, Y @ g:i A', strtotime($booking->start_time)) }}</p>
    <p><strong>End Time:</strong> {{ date('l, F j, Y @ g:i A', strtotime($booking->end_time)) }}</p>

    <!-- Calculate and display duration in hours -->
    <p><strong>Duration:</strong> {{ (strtotime($booking->end_time) - strtotime($booking->start_time)) / 3600 }} hour(s)</p>
    
    <p><strong>Status:</strong> {{ ucfirst($booking->status) }}</p>
</body>
</html>
