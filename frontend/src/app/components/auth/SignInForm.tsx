'use client';

import Api from '@/app/lib/axiosInstance';
import React, { useEffect, useState } from 'react';

const SignInForm = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = test();
    // return () => {
    //   clearInterval(intervalId);
    // };
  }, []);

  const test = () =>
    setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

  // useEffect(() => {
  //   getData();
  // }, []);

  const getData = async () => {
    try {
      const res = await Api.get(`/appointments`);
      console.log(res, 'res');
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log(error);
      }
    }
  };

  return (
    <div className='text-center'>
      <input type='text' className='h-10 w-[350px] border focus:outline-none' />
      <h1>{count}</h1>
    </div>
  );
};

export default SignInForm;
