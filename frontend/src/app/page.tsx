'use client';

import { deleteCookie } from 'cookies-next';
import React, { useEffect } from 'react';

const Page = () => {
  useEffect(() => {
    setTimeout(() => {
      deleteCookie('token');
    }, 9000);
  }, []);
  return (
    <>
      <div className='container'>
        {/* for jest */}
        <h1 className='py-5 text-center text-3xl'>Hello world!</h1>
      </div>
      <div className='container'>
        <h1 className='mb-8'>Something</h1>
      </div>
    </>
  );
};

export default Page;
