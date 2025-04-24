// pages/spaces.tsx
import { Funnel_Display } from 'next/font/google';
import { useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image'; // Add Next/Image import
import Card from '@/components/space/Card';
import { getSpaces, Space } from '@/services/api';

const funnelDisplay = Funnel_Display({
    variable: '--font-funnel',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
});

interface SpacesPageProps {
    spaces: Space[];
}

export default function Spaces({ spaces }: SpacesPageProps) {
    const cardsRef = useRef<HTMLDivElement>(null);
    const RESOURCE_URL = process.env.NEXT_PUBLIC_RESOURCES_URL || '';

    // Triple the spaces array for testing
    const tripleSpaces = [...spaces, ...spaces, ...spaces];

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
            const cards = cardsRef.current.querySelectorAll('.space-card');
            cards.forEach(card => observer.observe(card));
        }

        return () => observer.disconnect();
    }, [spaces]);

    return (
        <div className={`${funnelDisplay.className} min-h-screen`}>
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
                    <div ref={cardsRef} className='flex flex-col gap-8'>
                        {spaces.map((space, index) => (
                            <div
                                key={`${space.id}-${index}`}
                                className='space-card opacity-0 translate-y-8 transition-all duration-300 ease-out bg-[#e8e4e6] rounded-sm shadow-md overflow-hidden flex'
                                style={{ transitionDelay: `${index * 40}ms` }}
                            >
                                {/* Image section using Next.js Image */}
                                {space.image && (
                                    <div
                                        className='w-1/3 min-w-[120px] relative'
                                        style={{ minHeight: '180px' }}
                                    >
                                        <Image
                                            src={`${RESOURCE_URL}${space.image}`}
                                            alt={space.name}
                                            fill
                                            className='object-cover'
                                            sizes='(max-width: 768px) 100vw, 33vw'
                                        />
                                    </div>
                                )}

                                {/* Content section */}
                                <div className='p-6 flex-1'>
                                    <h3 className='text-xl font-semibold text-[#001e1d] mb-3'>
                                        {space.name}
                                    </h3>
                                    <p className='text-[#0f3433] mb-4'>{space.description}</p>
                                    <a
                                        href={`/spaces/${space.id}`}
                                        className='inline-block bg-[#004643] text-[#fffffe] px-4 py-2 rounded text-sm font-medium
                                        transition duration-90 ease-in-out hover:scale-97 active:scale-94 active:bg-button-active hover:bg-[#006663]'
                                    >
                                        View details
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const spaces = await getSpaces();

    return {
        props: {
            spaces,
        },
    };
};
