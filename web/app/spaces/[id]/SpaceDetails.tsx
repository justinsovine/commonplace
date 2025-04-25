'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Space, Booking } from '@/api';

interface SpaceDetailsProps {
    space: Space;
    formattedDate: string;
    bookings?: Booking[];
}

export default function SpaceDetails({ space, formattedDate, bookings }: SpaceDetailsProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Animation on page load
        setIsLoaded(true);
    }, []);

    return (
        <div className='lg:w-1/2'>
            <div
                className={`transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
                <h1 className='text-5xl md:text-6xl font-extrabold text-[#fffffe] mb-6'>
                    {space.name}
                </h1>

                <div className='space-y-8'>
                    <div>
                        <h2 className='text-2xl font-semibold text-[#abd1c6] mb-3'>
                            About this space
                        </h2>
                        <p className='text-[#abd1c6] leading-7 whitespace-pre-line'>
                            {space.description}
                        </p>
                    </div>

                    {/* Last updated info */}
                    <div>
                        <h2 className='text-2xl font-semibold text-[#abd1c6] mb-4'>Last Updated</h2>
                        <p className='text-[#abd1c6]'>{formattedDate}</p>
                    </div>

                    {/* Reservation button */}
                    <div className='mb-8'>
                        <Link
                            href={`/reserve/${space.id}`}
                            className='inline-block bg-[#f9bc60] text-[#001e1d] px-6 py-3 rounded-md text-lg font-semibold
              transition duration-90 ease-in-out hover:scale-98 hover:bg-button-hover active:scale-96 shadow-md'
                        >
                            Reserve this space
                        </Link>
                    </div>

                    {/* Upcoming bookings section */}
                    {bookings && bookings.length > 0 ? (
                        <div>
                            <h2 className='text-2xl font-semibold text-[#abd1c6] mb-4'>
                                Upcoming Bookings
                            </h2>
                            <div className='space-y-4'>
                                {bookings.map(booking => (
                                    <div
                                        key={booking.id}
                                        className={`p-3 rounded ${booking.status === 'confirmed' ? 'bg-secondary' : 'bg-tertiary'}`}
                                    >
                                        <div className='flex justify-between items-center'>
                                            <div>
                                                <p className='text-stroke'>
                                                    {new Date(
                                                        booking.start_time
                                                    ).toLocaleDateString('en-US', {
                                                        weekday: 'short',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                    {' - '}
                                                    {new Date(
                                                        booking.start_time
                                                    ).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                    {' - '}
                                                    {new Date(booking.end_time).toLocaleTimeString(
                                                        [],
                                                        {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-2 py-1 text-xs rounded ${booking.status === 'confirmed' ? 'bg-green-700 text-white' : 'bg-red-700 text-white'}`}
                                            >
                                                {booking.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className='text-paragraph pt-4'>No confirmed bookings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
