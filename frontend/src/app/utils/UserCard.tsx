import React, { FC } from 'react';
import { UserProps } from '../types/user';

const UserCard: FC<UserProps> = ({ user }) => {
  return (
    <div className='group rounded-lg border border-transparent bg-white py-12 shadow-sm transition-all duration-500 hover:border-theme-primary md:py-10'>
      <div className='m-3 flex flex-col items-center justify-center pb-8 md:m-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='75'
          height='75'
          fill='currentColor'
          className='bi bi-person-circle transition-all duration-500 group-hover:fill-theme-primary'
          viewBox='0 0 16 16'
        >
          <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0' />
          <path
            fillRule='evenodd'
            d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1'
          />
        </svg>
        <h4 className='m-0 mt-4 p-0 text-2xl font-semibold'>
          {user?.name || 'No Name'}
        </h4>
      </div>
      <div className='mx-5 flex items-center justify-between'>
        <button className='custom-btn'>Appointment</button>
        <button className='custom-btn'>Profile</button>
      </div>
    </div>
  );

  //   return (
  //     <div className='transform overflow-hidden rounded-lg bg-white shadow-md transition-transform'>
  //       <div className='m-3 md:m-4'>
  //         <h2 className='mb-2 text-xl font-bold'>{item?.name || 'No Name'}</h2>
  //         <p className='mb-2 text-gray-700'>{item?.title}</p>
  //         <p className='mb-2 text-gray-700'>Phone: 01986221266</p>
  //         <p className='text-gray-700'>Status: 1</p>
  //       </div>
  //       <div className='flex items-center justify-between bg-gray-100 p-4'>
  //         <button className='custom-btn'>Appointment</button>
  //         <button className='custom-btn'>Profile</button>
  //       </div>
  //     </div>
  //   );
};

export default UserCard;
