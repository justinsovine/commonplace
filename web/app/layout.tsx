import '@/globals.css';
import { Funnel_Display } from 'next/font/google';
import Header from './layout/Header';
import Footer from './layout/Footer';

const funnelDisplay = Funnel_Display({
    variable: '--font-funnel',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata = {
    title: 'Maplewood Cultural Arts Center',
    description: 'Find and book spaces for your next event',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' className={funnelDisplay.variable}>
            <body className='antialiased bg-background min-h-screen flex flex-col'>
                <main className='flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                    <Header />
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    );
}
