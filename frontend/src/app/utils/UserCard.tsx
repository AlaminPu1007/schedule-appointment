import React from 'react';

const UserCard = () => {
  return (
    <div className='transform overflow-hidden rounded-lg bg-white shadow-md transition-transform'>
      <div className='m-3 md:m-4'>
        <h2 className='mb-2 text-xl font-bold'>Md. Alamin</h2>
        <p className='mb-2 text-gray-700'>Email: test@gmail.com</p>
        <p className='mb-2 text-gray-700'>Phone: 01986221266</p>
        <p className='text-gray-700'>Status: 1</p>
      </div>
      <div className='flex items-center justify-between bg-gray-100 p-4'>
        <button className='custom-btn'>Appointment</button>
        <button className='custom-btn'>Profile</button>
      </div>
    </div>
  );
};

export default UserCard;
