'use client';

import Api, { CustomAxiosError } from '@/app/lib/axiosInstance';
import { handleError } from '@/app/lib/errorHandler';
import { User } from '@/app/types/user';
import UserCard from '@/app/utils/UserCard';
import UserCardSkeleton from '@/app/utils/UserCardSkeleton';
import React, { useEffect, useState } from 'react';

const UserList = () => {
  // define component local state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userList, setUserList] = useState<User[]>([]);
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // get user list from server
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Get user data from server
   */
  const getUserData = async () => {
    if (loading) return;
    try {
      const res = await Api.get(`/users`);
      // this will be treat as a root-data
      setUserList(res.data || []);
      setData(res.data || []);
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
    <div>
      <div className='mx-auto'>
        <div className='grid grid-cols-1 gap-6 py-4 md:grid-cols-2 md:py-6 lg:grid-cols-3'>
          {!loading && data?.length ? (
            data.map((item) => {
              const { _id } = item;
              return (
                <div key={_id}>
                  <UserCard user={item} />
                </div>
              );
            })
          ) : loading ? (
            Array.from({ length: 6 }).map((item, index) => {
              return (
                <div key={index}>
                  <UserCardSkeleton />
                </div>
              );
            })
          ) : (
            <div className='flex h-screen items-center justify-center'>
              <h1 className='text-3xl font-semibold'>
                The is not enough data to show.
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
