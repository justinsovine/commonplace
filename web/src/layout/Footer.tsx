import React from 'react';

export default function Footer() {
    return (
        <footer className='py-24 mt-auto'>
            <div className='flex justify-between items-center'>
                <p className='text-white font-sm'>
                    &copy; {new Date().getFullYear()} Commonplace. All rights reserved.
                </p>
                <div className='flex space-x-6'>
                    <a href='/about' className='text-white hover:underline font-semibold'>
                        About
                    </a>
                    <a href='/terms' className='text-white hover:underline font-semibold'>
                        Terms
                    </a>
                    <a href='/privacy' className='text-white hover:underline font-semibold'>
                        Privacy
                    </a>
                </div>
            </div>
        </footer>
    );
}
