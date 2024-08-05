'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AppointMentIFormInput } from '@/app/types/inputType';
import Api, { CustomAxiosError } from '@/app/lib/axiosInstance';
import { toast } from 'react-toastify';
import { handleError } from '@/app/lib/errorHandler';
import { useSearchParams } from 'next/navigation';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  date: yup.string().required('Date is required'),
  time: yup.string().required('Time is required'),
});

const AppointmentForm = () => {
  const params = useSearchParams();
  //   console.log(params.get('user_id'), 'params');

  // define component local memory
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointMentIFormInput>({
    resolver: yupResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit: SubmitHandler<AppointMentIFormInput> = async (data) => {
    try {
      setLoading(true);
      // get user id
      const userId = params.get('user_id');
      const tempData = { ...data, attendee: userId };

      await Api.post(`/appointments`, tempData);

      // set next cookies header,it help us to interact with middleware
      toast.success('Your appointment is created successfully');
    } catch (error) {
      handleError(error as CustomAxiosError);

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 py-8 shadow-lg'>
        <h1 className='py-2 pb-8 text-center text-3xl font-bold text-gray-800'>
          Schedule appointment
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-7'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Title
            </label>
            <input
              type='text'
              id='name'
              className={`input-box ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('title')}
            />
            {errors.title && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700'
            >
              Description
            </label>
            <input
              type='text'
              id='description'
              className={`input-box ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('description')}
            />
            {errors.description && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor='date'
              className='block text-sm font-medium text-gray-700'
            >
              Date
            </label>
            <input
              type='date'
              id='date'
              className={`input-box ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('date')}
            />
            {errors.date && (
              <p className='mt-1 text-xs text-red-500'>{errors.date.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor='time'
              className='block text-sm font-medium text-gray-700'
            >
              Time
            </label>
            <input
              type='time'
              id='time'
              className={`input-box ${
                errors.time ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('time')}
            />
            {errors.time && (
              <p className='mt-1 text-xs text-red-500'>{errors.time.message}</p>
            )}
          </div>
          <button
            type='submit'
            className='mt-[20px] w-full rounded-md bg-theme-primary px-4 py-2 text-white transition-all hover:bg-indigo-700'
          >
            {!loading ? 'Save' : 'loading...'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
