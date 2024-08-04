'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { removeItem } from '@/app/lib/localStorage';

const HeaderComponent = () => {
  const pathname = usePathname();
  const router = useRouter();

  // logout method of current user
  const logOut = () => {
    removeItem('token');
    deleteCookie('token');
    return router.push('/auth/signin');
  };

  return (
    <header>
      <div className='bg-white shadow-sm'>
        <div className='container mx-auto flex items-center justify-between px-4 py-4'>
          <div className='flex w-full items-center justify-between'>
            <div className='cursor-pointer text-xl font-bold'>Home</div>
            {pathname === '/' ? (
              <div className='flex items-center'>
                <div className='mx-4 flex-1'>
                  <input
                    type='text'
                    placeholder='Search'
                    className='rounded-full border p-2 px-5 text-sm outline-none duration-300 hover:border-theme-primary focus:border-theme-primary'
                  />
                </div>

                <div className='me-3 flex items-center transition-all'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    fill='#2f2f2f'
                    className='bi bi-person-circle cursor-pointer duration-300 hover:fill-theme-primary'
                    viewBox='0 0 16 16'
                  >
                    <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0' />
                    <path
                      fillRule='evenodd'
                      d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1'
                    />
                  </svg>
                </div>
                <div className='flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='22'
                    height='22'
                    fill='#2f2f2f'
                    className='bi bi-power cursor-pointer duration-300 hover:fill-theme-primary'
                    viewBox='0 0 16 16'
                    onClick={logOut}
                  >
                    <path d='M7.5 1v7h1V1z' />
                    <path d='M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812' />
                  </svg>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
