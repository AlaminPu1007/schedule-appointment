'use client';

import Api, { CustomAxiosError } from '@/app/lib/axiosInstance';
import { handleError } from '@/app/lib/errorHandler';
import { User } from '@/app/types/user';
import ResultNotFoundUI from '@/app/utils/ResultNotFoundUI';
import UserCard from '@/app/utils/UserCard';
import UserCardSkeleton from '@/app/utils/UserCardSkeleton';
import React, { useCallback, useEffect, useState } from 'react';
import HeaderComponent from './HeaderComponent';
import { debounce } from '@/app/lib/debounced';

const UserList = () => {
  // define component local state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userList, setUserList] = useState<User[]>([]);
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    // get user list from server
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Get user data from server
   */
  const getUserData = async () => {
    try {
      setLoading(true);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce((value: string) => {
      // eslint-disable-next-line no-console
      console.log('Search value:', value);
      // Add your search logic here
    }, 500),
    []
  );

  const onSearchChange = (value: string) => {
    setSearchText(value);
    handleSearch(value);
  };

  return (
    <div>
      <div>
        <HeaderComponent
          searchText={searchText}
          onSearchChange={onSearchChange}
        />
      </div>
      <div className='container mx-auto'>
        <div>
          {!loading && data?.length ? (
            <div className='grid grid-cols-1 gap-6 py-4 md:grid-cols-2 md:py-6 lg:grid-cols-3'>
              {data.map((item) => {
                const { _id } = item;
                return (
                  <div key={_id}>
                    <UserCard user={item} />
                  </div>
                );
              })}
            </div>
          ) : loading ? (
            <div className='grid grid-cols-1 gap-6 py-4 md:grid-cols-2 md:py-6 lg:grid-cols-3'>
              {Array.from({ length: 6 }).map((item, index) => {
                return (
                  <div key={index}>
                    <UserCardSkeleton />
                  </div>
                );
              })}
            </div>
          ) : (
            <ResultNotFoundUI onRetry={getUserData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
