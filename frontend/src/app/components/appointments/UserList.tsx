'use client';

import Api, { CustomAxiosError } from '@/app/lib/axiosInstance';
import { handleError } from '@/app/lib/errorHandler';
import UserCard from '@/app/utils/UserCard';
import React, { useEffect, useState } from 'react';

const UserList = () => {
  // define component local state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userList, setUserList] = useState<[]>([]);
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
      setLoading(false);

      const res = await Api.get(`/users`);
      // this will be treat as a root-data
      setUserList(res.data || []);
      setData(res.data || []);
    } catch (error) {
      handleError(error as CustomAxiosError);

      if (process.env.NODE_ENV === 'development') {
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
          {data?.length ? (
            data.map((item, index) => {
              return (
                <div key={index}>
                  <UserCard />
                </div>
              );
            })
          ) : (
            <div>
              <h1>Something</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
