import Image from 'next/image';
import Link from 'next/link';
import { Funnel_Display } from 'next/font/google';

const funnelDisplay = Funnel_Display({
    variable: '--font-funnel',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
});

export default function Home() {
    return (
        <div className={`${funnelDisplay.className} grid gap-6 pt-8`}>
            <div className='flex flex-col md:flex-row gap-24 items-start'>
                <div className='w-full md:w-1/2'>
                    <h1 className='text-6xl font-extrabold text-white mb-6'>
                        Maplewood Cultural Arts Center
                    </h1>
                    <p className='text-xl text-paragraph leading-7 mb-12'>
                        Looking for a place to host your next class, meeting, or community event?
                        Maplewood offers flexible, welcoming spaces designed to support local
                        creativity and connection. Browse the spaces below to find the right fit for
                        you.
                    </p>
                    <Link
                        href={`/spaces`}
                        className={`inline-block bg-button text-button-text px-8 py-6 rounded-sm font-semibold text-base 
                        transition duration-90 ease-in-out 
                        hover:scale-99 hover:bg-button-hover 
                        active:scale-96 active:bg-button-active`}
                    >
                        View Available Spaces
                    </Link>
                </div>
                <div className='w-full md:w-1/2'>
                    <Image
                        src='/img/maplewood.png'
                        alt='Maplewood Cultural Arts Center'
                        width={500}
                        height={500}
                        className='w-full rounded-lg shadow-lg'
                    />
                </div>
            </div>

            {/* <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        
        <div className="bg-white rounded-md shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl text-gray-600 font-semibold mb-3">Performance Hall</h2>
          <p className="text-gray-600 mb-4">A 75-seat black box theater with flexible staging. Ideal for performances, speaker events, film screenings, and rehearsals. Includes basic AV setup, dimmable lighting, and stackable chairs for reconfiguration.</p>
          <a href="/spaces/1" className="text-blue-600 hover:text-blue-800 font-medium">
            View details
          </a>
        </div>
        
        <div className="bg-white rounded-md shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Art & Workshop Space</h2>
          <p className="text-gray-600 mb-4">Located on the top floor with ample skylights and industrial sinks. Designed for hands-on workshops, art classes, pottery, or fiber arts. Equipped with folding tables, easels, and open storage for short-term material use.</p>
          <a href="/spaces/2" className="text-blue-600 hover:text-blue-800 font-medium">
            View details
          </a>
        </div>
        
        <div className="bg-white rounded-md shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Meeting & Multi-Use Space</h2>
          <p className="text-gray-600 mb-4">A clean, multi-purpose space with whiteboard walls and stackable furniture. Used for public lectures, book clubs, civic meetings, small classes, and tutoring. Quiet, well-lit, and adjacent to restrooms and a kitchenette.</p>
          <a href="/spaces/3" className="text-blue-600 hover:text-blue-800 font-medium">
            View details
          </a>
        </div>
      </div> */}
        </div>
    );
}
