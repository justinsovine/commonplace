'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Space } from '../../src/services/api';

export default function SpaceCards({ spaces }: { spaces: Space[] }) {
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
            const cards = cardsRef.current.querySelectorAll('.space-card');
            cards.forEach(card => observer.observe(card));
        }

        return () => observer.disconnect();
    }, [spaces]);

    return (
        <div ref={cardsRef} className='flex flex-col gap-8'>
            {spaces.map((space, index) => (
                <div
                    key={`${space.id}-${index}`}
                    className='space-card opacity-0 translate-y-8 transition-all duration-300 ease-out bg-[#e8e4e6] rounded-sm shadow-md overflow-hidden flex'
                    style={{ transitionDelay: `${index * 40}ms` }}
                >
                    {/* Image section */}
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
                        <h3 className='text-xl font-semibold text-[#001e1d] mb-3'>{space.name}</h3>
                        <p className='text-[#0f3433] mb-4'>{space.description}</p>
                        <Link
                            href={`/spaces/${space.id}`}
                            className='inline-block bg-[#004643] text-[#fffffe] px-4 py-2 rounded text-sm font-medium
              transition duration-90 ease-in-out hover:scale-97 active:scale-94 active:bg-button-active hover:bg-[#006663]'
                        >
                            View details
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
