<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Log;
use App\Exceptions\BookingConflictException;
use App\Http\Middleware\CorsMiddleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Open up CORS to NEXT
        $middleware->append(CorsMiddleware::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function ($request, $exception) {
            Log::error('Exception caught: ' . $exception->getMessage(), [
                'exception' => $exception
            ]);

            // Booking conflict
            if ($exception instanceof BookingConflictException) {
                throw new BookingConflictException();
            }

            // Default error handling for other exceptions
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $exception->getMessage()
            ], 500); // Internal Server Error
        });
    })
    ->create();
