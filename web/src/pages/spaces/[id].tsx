// pages/spaces/[id].tsx
import { Funnel_Display } from 'next/font/google';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSpace, Space } from '@/services/api';

const funnelDisplay = Funnel_Display({
    variable: '--font-funnel',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
});

interface SpacePageProps {
    space: Space;
    formattedDate: string;
}

export default function SpacePage({ space, formattedDate }: SpacePageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const RESOURCE_URL = process.env.NEXT_PUBLIC_RESOURCES_URL || '';
    
    useEffect(() => {
        // Animation on page load
        setIsLoaded(true);
    }, []);
    
    return (
        <div className={`${funnelDisplay.className} min-h-screen`}>
            <div className={`container mx-auto px-4 py-8 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
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
                                <h2 className="text-2xl font-semibold text-[#abd1c6] mb-3">Last Updated</h2>
                                <p className="text-[#abd1c6]">
                                    {formattedDate}
                                </p>
                            </div>
                            
                            {/* Reservation button */}
                            <div className="pt-4">
                                <a 
                                    href={`/reserve/${space.id}`}
                                    className="inline-block bg-[#f9bc60] text-[#001e1d] px-6 py-3 rounded-md text-lg font-semibold
                                    transition-all duration-300 hover:bg-[#ffd08a] transform hover:-translate-y-1 shadow-md"
                                >
                                    Reserve this space
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Additional sections like calendar availability, reviews, etc. could go here */}
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };
    
    try {
        const space = await getSpace(parseInt(id, 10));
        
        if (!space) {
            return {
                notFound: true
            };
        }
        
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
                formattedDate
            }
        };
    } catch (error) {
        console.error("Error in getServerSideProps:", error);
        return {
            notFound: true
        };
    }
};