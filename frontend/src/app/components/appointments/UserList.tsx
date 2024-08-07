'use client';

import Api, { CustomAxiosError } from '@/app/lib/axiosInstance';
import { handleError } from '@/app/lib/errorHandler';
import { User, UserResponse } from '@/app/types/user';
import ResultNotFoundUI from '@/app/utils/ResultNotFoundUI';
import UserCard from '@/app/utils/UserCard';
import UserCardSkeleton from '@/app/utils/UserCardSkeleton';
import React, { useCallback, useEffect, useState } from 'react';
import HeaderComponent from './HeaderComponent';
import { debounce } from '@/app/lib/debounced';
import { searchUser } from '@/app/lib/searchUserByQueryParams';
import Pagination from 'rc-pagination';

const UserList = () => {
  // define component local state
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(6);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    // get user list from server
    getUserData(page, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
   * Fetches user data with pagination.
   * @param {number} page - The current page number
   * @param {number} limit - The number of users per page.
   * @return {Promise<void>}
   */
  const getUserData = async (page: number, limit: number) => {
    try {
      setLoading(true);

      const res = await Api.get<UserResponse>(
        `/users?page=${page}&limit=${limit}`
      );

      // this will be treat as a root-data
      setData(res.data.users || []);
      setPage(res.data.currentPage);
      setTotalUsers(res.data.totalUsers);
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

  /*
   * Handles the search input change.
   *
   * @param {string} value - The search query.
   * @return {void}
   */
  const onSearchChange = (value: string) => {
    setSearchText(value);
    handleSearch(value, 1);
  };

  /*
   * Debounced search handler.
   *
   * @param {string} value - The search query.
   * @param {number} cur_page - The current page number for pagination.
   * @return {Promise<void>}
   */

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce(async (value: string, cur_page: number) => {
      setLoading(true);
      try {
        const data = await searchUser(value, cur_page, limit); // Reset to page 1 on new search

        setData(data.users);
        setPage(data.currentPage);
        setTotalUsers(data.totalUsers);
      } catch (error) {
        // Handle error if needed
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  /*
   * Handles page change for pagination.
   *
   * @param {number} current - The current page number.
   * @return {Promise<void>}
   */
  const handlePageChange = async (current: number) => {
    setPage(current);
    setLoading(true);
    try {
      const data = await searchUser(searchText, current, limit);

      setData(data.users);
      setPage(data.currentPage);
      setTotalUsers(data.totalUsers);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
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
            <div className='mt-[200px] flex items-center justify-center lg:mt-0 lg:h-[50vh]'>
              <ResultNotFoundUI onRetry={() => getUserData(page, limit)} />
            </div>
          )}
        </div>
        {!loading && data?.length ? (
          <div className='flex items-center justify-center pb-2 sm:pb-4'>
            <Pagination
              current={page}
              total={totalUsers}
              pageSize={limit}
              onChange={handlePageChange}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserList;
