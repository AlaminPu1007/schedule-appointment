/**
 * A skeleton loader component for the appointment card list.
 *
 * This component displays a placeholder with animated pulsing effect
 * while the actual appointment card data is loading. It provides a visual
 * indication of content loading to enhance user experience.
 *
 * @component
 * @returns {JSX.Element} - A JSX element representing the skeleton loader.
 */

import React from 'react';

const AppointmentSkeleton = () => {
  return (
    <div className='m2-4 rounded-lg border bg-white p-4 shadow-md'>
      <div className='animate-pulse'>
        <div className='mb-2 h-6 w-3/4 rounded bg-gray-200'></div>
        <div className='mb-4 h-4 w-1/2 rounded bg-gray-200'></div>
        <div className='mb-2 h-4 w-2/3 rounded bg-gray-200'></div>
        <div className='mb-2 h-4 w-1/3 rounded bg-gray-200'></div>
        <div className='mb-4 h-4 w-1/2 rounded bg-gray-200'></div>
        <div className='flex space-x-4'>
          <div className='h-8 w-1/4 rounded bg-gray-200'></div>
          <div className='h-8 w-1/4 rounded bg-gray-200'></div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSkeleton;
