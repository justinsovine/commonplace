import Image from 'next/image';
import Link from 'next/link';
import { getSpace, getSpaceBookings } from '@/api';
import SpaceDetails from './SpaceDetails';

export const dynamic = 'force-dynamic';

// Generate metadata for each page
export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const spaceId = parseInt(params.id, 10);
    const space = await getSpace(spaceId);

    if (!space) {
        return {
            title: 'Space Not Found',
        };
    }

    return {
        title: `${space.name} - Maplewood Cultural Arts Center`,
    };
}

export default async function SpacePage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const spaceId = parseInt(params.id, 10);
    const space = await getSpace(spaceId);

    if (!space) {
        return <div>Space not found</div>;
    }

    const bookings = await getSpaceBookings(spaceId);
    const RESOURCE_URL = process.env.NEXT_PUBLIC_RESOURCES_URL || '';

    // Format the date
    const updatedDate = new Date(space.updated_at);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(updatedDate);

    return (
        <div className='min-h-screen'>
            <div className='container mx-auto pb-8'>
                {/* Breadcrumb navigation */}
                <div className='mb-8'>
                    <Link
                        href='/spaces'
                        className='text-[#abd1c6] hover:text-[#fffffe] transition-colors duration-300'
                    >
                        ← Back to all spaces
                    </Link>
                </div>

                <div className='flex flex-col lg:flex-row gap-12'>
                    {/* Space image */}
                    {space.image && (
                        <div className='lg:w-1/2 h-[400px] md:h-[500px] relative rounded-lg overflow-hidden shadow-lg'>
                            <Image
                                src={`${RESOURCE_URL}${space.image}`}
                                alt={space.name}
                                fill
                                className='object-cover'
                                priority
                                sizes='(max-width: 768px) 100vw, 50vw'
                            />
                        </div>
                    )}

                    {/* Space details with client-side animations */}
                    <SpaceDetails space={space} formattedDate={formattedDate} bookings={bookings} />
                </div>
            </div>
        </div>
    );
}
