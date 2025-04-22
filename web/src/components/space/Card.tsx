import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type CardProps = {
  title: string;
  description: string;
  link: string;
  image?: string; // Optional image URL from API
  linkText?: string;
  className?: string;
};

export default function Card({ 
  title, 
  description, 
  link, 
  image,
  linkText = 'View details',
  className = '' 
}: CardProps) {
  return (
    <div className={`bg-white rounded-md shadow-md hover:shadow-lg transition-shadow flex overflow-hidden ${className}`}>
      {image && (
        <div className="w-1/3 min-w-[120px] flex-shrink-0">
          <div className="relative h-full">
            <Image 
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
      <div className="p-6 flex-grow">
        <h2 className="text-xl text-gray-800 font-semibold mb-3">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link href={link} className="text-blue-600 hover:text-blue-800 font-medium">
          {linkText}
        </Link>
      </div>
    </div>
  );
}