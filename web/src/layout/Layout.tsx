import React, { ReactNode } from 'react';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import { Funnel_Display } from 'next/font/google';

const funnelDisplay = Funnel_Display({
    variable: '--font-funnel',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
});

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div className='flex flex-col min-h-screen'>
            <main className='flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <Header />
                {children}
                <Footer />
            </main>
        </div>
    );
}
