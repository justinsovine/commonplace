// pages/spaces.tsx
import { Funnel_Display } from 'next/font/google';
import { useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllBookings, Booking } from '@/services/api';

const funnelDisplay = Funnel_Display({
    variable: '--font-funnel',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
});

interface BookingsPageProps {
    bookings: Booking[];
}

export default function Bookings({ bookings }: BookingsPageProps) {
    const cardsRef = useRef<HTMLDivElement>(null);
    const RESOURCE_URL = process.env.NEXT_PUBLIC_RESOURCES_URL || '';

    useEffect(() => {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Add delay based on index for staggered animation
                        setTimeout(() => {
                            entry.target.classList.add('opacity-100', 'translate-y-0');
                        }, index * 150);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        );

        // Observe all cards
        if (cardsRef.current) {
            const cards = cardsRef.current.querySelectorAll('.booking-card');
            cards.forEach(card => observer.observe(card));
        }

        return () => observer.disconnect();
    }, [bookings]);

    // Helper function to get the background color based on status
    const getBackgroundColor = (status: string) => {
        switch(status) {
            case 'confirmed': return 'bg-secondary';
            case 'pending': return 'bg-highlight';
            case 'cancelled': return 'bg-tertiary';
            default: return 'bg-secondary';
        }
    };

    // Helper function to get the badge color based on status
    const getBadgeColor = (status: string) => {
        switch(status) {
            case 'confirmed': return 'bg-green-700 text-white';
            case 'pending': return 'bg-yellow-600 text-stroke';
            case 'cancelled': return 'bg-red-700 text-white';
            default: return 'bg-gray-600 text-white';
        }
    };

    return (
        <div className={`${funnelDisplay.className} min-h-screen`}>
            <div className='container mx-auto px-4 py-8'>
                <h1 className="text-4xl font-bold text-[#fffffe] mb-8">Your Bookings</h1>
                
                {bookings && bookings.length > 0 ? (
                    <div ref={cardsRef} className={`w-full space-y-6`}>
                        {bookings.map((booking) => (
                            <div 
                                key={booking.id}
                                className={`booking-card p-4 rounded-lg shadow-md opacity-0 translate-y-8 transition-all duration-300 ease-out ${getBackgroundColor(booking.status)}`}
                            >
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Space image */}
                                    {booking.space.image && (
                                        <div className="md:w-1/4 h-32 md:h-auto relative rounded overflow-hidden">
                                            <Image
                                                src={`${RESOURCE_URL}${booking.space.image}`}
                                                alt={booking.space.name}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 25vw"
                                            />
                                        </div>
                                    )}
                                    
                                    {/* Booking details */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-semibold text-stroke mb-1">
                                                    <Link href={`/spaces/${booking.space_id}`} className="hover:underline">
                                                        {booking.space.name}
                                                    </Link>
                                                </h3>
                                                <p className="text-stroke text-sm mb-3">
                                                    {new Date(booking.start_time).toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'})}
                                                    <br />
                                                    {new Date(booking.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                    {' - '}
                                                    {new Date(booking.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 text-xs rounded-full font-medium ${getBadgeColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                        
                                        {/* Short space description */}
                                        <p className="text-stroke text-sm line-clamp-2 mb-3">
                                            {booking.space.description}
                                        </p>
                                        
                                        {/* Action buttons */}
                                        <div className="flex gap-3 mt-2">
                                            <Link 
                                                href={`/bookings/${booking.id}`}
                                                className="text-sm px-3 py-1 rounded bg-[#004643] text-[#fffffe] hover:bg-[#006663] transition-colors"
                                            >
                                                View Details
                                            </Link>
                                            {booking.status !== 'cancelled' && (
                                                <button 
                                                    className="text-sm px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className={`text-paragraph pt-4`}>No bookings found.</p>
                )}
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const bookings = await getAllBookings();

    return {
        props: {
            bookings,
        },
    };
};