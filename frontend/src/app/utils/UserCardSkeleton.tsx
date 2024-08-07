/**
 * A skeleton loader component for the user card list.
 *
 * This component displays a placeholder with animated pulsing effect
 * while the actual appointment card data is loading. It provides a visual
 * indication of content loading to enhance user experience.
 *
 * @component
 * @returns {JSX.Element} - A JSX element representing the skeleton loader.
 */

import React from 'react';

const UserCardSkeleton = () => {
  return (
    <div className='group animate-pulse rounded-lg border border-transparent bg-gray-200 py-12 shadow-sm transition-all duration-500 md:py-10'>
      <div className='m-3 flex items-center justify-center pb-8 md:m-4'>
        <div className='h-16 w-16 animate-pulse rounded-full bg-gray-300'></div>
      </div>

      <div className='mx-5 flex items-center justify-between'>
        <div className='h-5 w-full animate-pulse rounded bg-gray-300'></div>
        <div className='h-5 w-24 animate-pulse rounded bg-gray-300'></div>
      </div>

      <div className='mx-5 mt-4 flex items-center justify-between'>
        <div className='h-8 w-24 animate-pulse rounded bg-gray-300'></div>
        <div className='h-8 w-24 animate-pulse rounded bg-gray-300'></div>
      </div>
    </div>
  );
};

export default UserCardSkeleton;
