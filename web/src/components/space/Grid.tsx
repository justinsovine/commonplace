import React, { ReactNode } from 'react';

type GridProps = {
    children: ReactNode;
    className?: string;
};

export default function Grid({ children, className = '' }: GridProps) {
    return (
        <div className={`mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
            {children}
        </div>
    );
}
