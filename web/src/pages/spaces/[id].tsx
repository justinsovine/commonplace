// pages/spaces/[id].tsx
import { Funnel_Display } from 'next/font/google';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSpace, Space, getSpaceBookings, Booking } from '@/services/api';

const funnelDisplay = Funnel_Display({
    variable: '--font-funnel',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
});

interface SpacePageProps {
    space: Space;
    formattedDate: string;
    bookings?: Booking[];
}

export default function SpacePage({ space, formattedDate, bookings }: SpacePageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const RESOURCE_URL = process.env.NEXT_PUBLIC_RESOURCES_URL || '';
    
    useEffect(() => {
        // Animation on page load
        setIsLoaded(true);
    }, []);
    
    return (
        <div className={`${funnelDisplay.className} min-h-screen`}>
            <div className={`container mx-auto pb-8 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {/* Breadcrumb navigation */}
                <div className="mb-8">
                    <Link 
                        href="/spaces" 
                        className="text-[#abd1c6] hover:text-[#fffffe] transition-colors duration-300"
                    >
                        ← Back to all spaces
                    </Link>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Space image */}
                    {space.image && (
                        <div className="lg:w-1/2 h-[400px] md:h-[500px] relative rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={`${RESOURCE_URL}${space.image}`}
                                alt={space.name}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    )}
                    
                    {/* Space details */}
                    <div className="lg:w-1/2">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-[#fffffe] mb-6">
                            {space.name}
                        </h1>
                        
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-semibold text-[#abd1c6] mb-3">About this space</h2>
                                <p className="text-[#abd1c6] leading-7 whitespace-pre-line">
                                    {space.description}
                                </p>
                            </div>
                            
                            {/* Last updated info */}
                            <div>
                                <h2 className="text-2xl font-semibold text-[#abd1c6] mb-4">Last Updated</h2>
                                <p className="text-[#abd1c6]">
                                    {formattedDate}
                                </p>
                            </div>
                            
                            {/* Reservation button */}
                            <div className="mb-8">
                                <a 
                                    href={`/reserve/${space.id}`}
                                    className="inline-block bg-[#f9bc60] text-[#001e1d] px-6 py-3 rounded-md text-lg font-semibold
                                    transition duration-90 ease-in-out hover:scale-98 hover:bg-button-hover active:scale-96 shadow-md"
                                >
                                    Reserve this space
                                </a>
                            </div>

                            {/* Upcoming bookings section */}
                            {bookings && bookings.length > 0 ? (
                                <div>
                                    <h2 className="text-2xl font-semibold text-[#abd1c6] mb-4">Upcoming Bookings</h2>
                                    <div className="space-y-4">
                                        {bookings.map((booking) => (
                                            <div 
                                                key={booking.id}
                                                className={`p-3 rounded ${
                                                    booking.status === 'confirmed' 
                                                        ? 'bg-secondary' 
                                                        : 'bg-tertiary'
                                                }`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-stroke">
                                                            {new Date(booking.start_time).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'})}
                                                            {' - '}
                                                            {new Date(booking.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                            {' - '}
                                                            {new Date(booking.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                        </p>
                                                    </div>
                                                    <span className={`px-2 py-1 text-xs rounded ${
                                                        booking.status === 'confirmed' 
                                                            ? 'bg-green-700 text-white' 
                                                            : 'bg-red-700 text-white'
                                                    }`}>
                                                        {booking.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <p className={`text-paragraph pt-4`}>No confirmed bookings found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };
    const spaceId = parseInt(id, 10);
    
    try {
        const space = await getSpace(spaceId);
        
        if (!space) {
            return {
                notFound: true
            };
        }
        
        // Get bookings for this space
        const bookings = await getSpaceBookings(spaceId);
        
        // Format the date
        const updatedDate = new Date(space.updated_at);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(updatedDate);
        
        return {
            props: {
                space,
                formattedDate,
                bookings,
            }
        };
    } catch (error) {
        console.error("Error in getServerSideProps:", error);
        return {
            notFound: true
        };
    }
};