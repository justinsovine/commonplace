'use client'

import React from 'react';
import Link from 'next/link';
import { Funnel_Display } from 'next/font/google';

const funnelDisplay = Funnel_Display({
    variable: '--font-funnel',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
});

export default function Header() {
    return (
        <header className='flex justify-between items-center pt-6 pb-24 ${funnelDisplay.className}'>
            <div className='text-2xl font-bold'>
                <Link href='/' className='text-white transition-colors'>
                    <span>commonplace</span>
                </Link>
            </div>
            <nav>
                <ul className='flex space-x-8'>
                    <li>
                        <Link
                            href='/'
                            className='text-white hover:underline font-semibold transition-colors'
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/spaces'
                            className='text-white hover:underline font-semibold transition-colors'
                        >
                            Spaces
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/bookings'
                            className='text-white hover:underline font-semibold transition-colors'
                        >
                            Bookings
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
