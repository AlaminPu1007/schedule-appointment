'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import Api, { CustomAxiosError } from '@/app/lib/axiosInstance';
import { handleError } from '@/app/lib/errorHandler';
import { setItem } from '@/app/lib/localStorage';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { toast } from 'react-toastify';
import { IFormInput } from '@/app/types/inputType';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignUpForm: React.FC = () => {
  const router = useRouter();
  // define component local memory
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (loading) return;
    try {
      // start loader
      setLoading(true);

      const res = await Api.post(`/auth/register`, data);
      const { token = '', userId = '' } = res.data;

      // set user-id in local-storage
      setItem('userId', userId);
      // set token in local-storage
      setItem('token', token);
      // set next cookies header,it help us to interact with middleware
      setCookie('token', token, { maxAge: 60 * 60 * 24 * 7 }); // Expires in 1 week
      toast.success('Your account is created successfully');
      router.replace('/');
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
        <h1 className='py-3 text-center text-3xl font-bold text-gray-800'>
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-7'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              className={`input-box ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('name')}
            />
            {errors.name && (
              <p className='mt-1 text-xs text-red-500'>{errors.name.message}</p>
            )}
          </div>
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
          <div>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-gray-700'
            >
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              className={`input-box ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type='submit'
            className='mt-[20px] w-full rounded-md bg-theme-primary px-4 py-2 text-white transition-all hover:bg-indigo-700'
          >
            {!loading ? 'Sign up' : 'loading...'}
          </button>
        </form>
        <div className='mt-5 text-center text-sm'>
          <p>
            {`Don't have an account?`}{' '}
            <Link
              href={'/auth/signin'}
              className='relative text-theme-primary after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-theme-primary after:duration-200 after:ease-in hover:after:w-full'
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
