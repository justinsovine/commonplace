import { getSpaces } from '@/api';
import SpaceCards from './SpaceCards';

export const dynamic = 'force-dynamic';

async function getSpacesData() {
    return await getSpaces();
}

export default async function Spaces() {
    const spaces = await getSpacesData();

    return (
        <div className='min-h-screen'>
            <div className='flex flex-col md:flex-row gap-12'>
                {/* Sticky left section */}
                <div className='md:w-2/5 md:sticky md:top-8 md:h-screen md:flex md:flex-col md:justify-start'>
                    <h1 className='text-6xl font-extrabold text-[#fffffe] mb-6'>
                        Your Community, Your Space
                    </h1>
                    <p className='text-xl text-[#abd1c6] leading-7 mb-12'>
                        From intimate gatherings to creative workshops, Maplewood's spaces are here
                        for you. Explore our available rooms and imagine what you could create or
                        share within them.
                    </p>
                </div>

                {/* Scrolling cards section */}
                <div className='md:w-3/5 -mt-8'>
                    <SpaceCards spaces={spaces} />
                </div>
            </div>
        </div>
    );
}
