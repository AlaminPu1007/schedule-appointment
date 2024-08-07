/**
 * A component to display a "No Results Found" message.
 * It includes an icon, a message, and a button to navigate back to the homepage.
 *
 * @component
 * @example
 * return (
 *   <NoResults />
 * );
 */
'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const NoResults = () => {
  const router = useRouter();
  return (
    <div className='fixed inset-0 z-[999999] flex items-center justify-center bg-white px-3 py-5'>
      <div className='py-5 text-center'>
        <h1 className='mb-2 text-6xl font-bold uppercase text-red-600'>
          Oops!
        </h1>
        <span
          className='mx-auto mb-2 block border-l-2 border-red-600'
          style={{ width: '1px', height: '100px' }}
        ></span>
        <h4 className='mb-3 text-2xl'>
          <span className='text-red-600'>404</span> - Page not found
        </h4>
        <p className='mb-3 text-lg text-gray-600'>
          The page you are looking for might have been removed, had its name
          changed
          <br className='hidden xl:inline' />
          or is temporarily unavailable.
        </p>
        <button
          type='button'
          onClick={() => router.push('/')}
          className='rounded-full bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NoResults;
