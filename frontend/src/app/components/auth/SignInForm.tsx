'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';

interface IFormInput {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup
    .string()
    .email('Invalid username address')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 py-8 shadow-lg'>
        <h1 className='py-3 text-center text-3xl font-bold text-gray-800'>
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-7'>
          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700'
            >
              Username
            </label>
            <input
              type='text'
              id='username'
              className={`input-box ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('username')}
            />
            {errors.username && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              className={`input-box ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('password')}
            />
            {errors.password && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type='submit'
            className='bg-theme-primary mt-[20px] w-full rounded-md px-4 py-2 text-white transition-all hover:bg-indigo-700'
          >
            Sign in
          </button>
        </form>
        <div className='mt-5 text-center text-sm'>
          <p>
            {`Don't have an account?`}{' '}
            <Link
              href={'/auth/signup'}
              className='text-theme-primary after:bg-theme-primary relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:duration-200 after:ease-in hover:after:w-full'
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
