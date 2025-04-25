import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div className='grid gap-6 pt-8'>
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
            transition duration-90 ease-in-out hover:scale-99 hover:bg-button-hover active:scale-96 active:bg-button-active`}
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
        </div>
    );
}
