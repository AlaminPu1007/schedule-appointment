import React from 'react';

interface NoDataProps {
  onRetry?: () => void; // Optional callback for retry action
}

const ResultNotFoundUI: React.FC<NoDataProps> = ({ onRetry }) => {
  return (
    <div className='flex w-full items-center justify-center bg-gray-100'>
      <div className='text-center'>
        <h1 className='text-3xl font-semibold text-gray-700'>
          No Data Available
        </h1>
        <p className='mt-4 text-gray-500'>
          {`We couldn't find the data you're looking for.\n Please try again later
          or refine your search.`}
        </p>
        {/* Optional: Add an interactive element like a button or icon */}
        <button onClick={onRetry} className='custom-btn mt-5'>
          Retry
        </button>
      </div>
    </div>
  );
};

export default ResultNotFoundUI;
