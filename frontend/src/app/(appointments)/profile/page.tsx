/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import HeaderComponent from '@/app/components/appointments/HeaderComponent';
import { debounce } from '@/app/lib/debounced';
import React, { useCallback, useState } from 'react';

const Page = () => {
  const [searchText, setSearchText] = useState<string>('');

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
      console.log(value, cur_page);

      // try {
      // } catch (error) {
      //   // Handle error if needed
      //   if (process.env.NODE_ENV === 'development') {
      //     // eslint-disable-next-line no-console
      //     console.error(error);
      //   }
      // } finally {
      // }
    }, 500),
    []
  );

  return (
    <>
      <div>
        <HeaderComponent
          searchText={searchText}
          onSearchChange={onSearchChange}
        />
      </div>
      <div className='container py-2 sm:py-4'>
        <div className='w-[100%] items-center md:flex'>
          <div className='mb-2 w-[100%] border bg-red-200 md:mb-0 md:w-[30%]'>
            left portion
          </div>
          <div className='w-[100%] border bg-green-200 md:w-[70%]'>
            right portion
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
