'use client';
import AppointmentList from '@/app/components/appointments/AppointmentList';
import HeaderComponent from '@/app/components/appointments/HeaderComponent';
import Api, { CustomAxiosError } from '@/app/lib/axiosInstance';
import { handleError } from '@/app/lib/errorHandler';
import { Appointment, GetAppointMentsProps } from '@/app/types/appointments';
import AppointmentSkeleton from '@/app/utils/AppointmentSkeleton ';
import ResultNotFoundUI from '@/app/utils/ResultNotFoundUI';
import Pagination from 'rc-pagination/lib/Pagination';
import React, { useEffect, useState } from 'react';

const Page = () => {
  // define component local memory
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState<number>(6);
  const [totalAppointments, setTotalAppointments] = useState<number>(0);

  useEffect(() => {
    fetchAppointments(currentPage, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Get all appoints of current user
   * @param value
   */

  const fetchAppointments = async (page: number, limit: number) => {
    try {
      setLoading(true);
      const { data } = await Api.get<GetAppointMentsProps>(
        `/appointments?page=${page}&limit=${limit}`
      );

      const { totalAppointments, appointments } = data;

      // update local state as well
      setAppointments(appointments);
      setTotalAppointments(totalAppointments);
      setCurrentPage(page);
    } catch (error) {
      handleError(error as CustomAxiosError);
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Error fetching appointments:', error);
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSearchChange = (value: string) => {};

  /*
   *Get data with search value
   */
  const handleSearch = async (page: number, limit: number) => {
    try {
      setLoading(true);
      const response = await Api.get<GetAppointMentsProps>(
        '/appointments/search',
        {
          params: {
            query: searchQuery,
            filter,
            page,
            limit,
          },
        }
      );

      const { totalAppointments, appointments } = response.data;
      setAppointments(appointments);
      setTotalAppointments(totalAppointments);
      setCurrentPage(page);
    } catch (error) {
      handleError(error as CustomAxiosError);
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Error searching appointments:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      const { data } = await Api.put(`/appointments/cancel/${id}`);
      setAppointments((prev) =>
        prev.map((appointment) => (appointment._id === id ? data : appointment))
      );
    } catch (error) {
      handleError(error as CustomAxiosError);
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Error canceling appointment:', error);
      }
    }
  };

  /**
   * Accept a appointment.
   * @param id this is appoint-id
   */
  const handleAccept = async (id: string) => {
    try {
      const { data } = await Api.put(`/appointments//accept/${id}`);
      setAppointments((prev) =>
        prev.map((appointment) => (appointment._id === id ? data : appointment))
      );
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Error canceling appointment:', error);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (searchQuery) {
      handleSearch(page, limit);
    } else {
      fetchAppointments(page, limit);
    }
  };

  return (
    <>
      <div>
        <HeaderComponent searchText={''} onSearchChange={onSearchChange} />
      </div>
      <div className='py-2'>
        <div className=''>
          <div className=''>
            <div className='container mx-auto py-4'>
              <div className='mb-4 items-center justify-between min-[860px]:flex'>
                <h1 className='mb-4 text-xl font-bold max-[860px]:w-full max-[860px]:text-center sm:text-2xl lg:mb-0'>
                  APPOINTMENT MANAGEMENT
                </h1>
                <div className='flex items-center max-[860px]:justify-center'>
                  <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='mr-2 border p-2 outline-none transition-all duration-300 hover:border-theme-primary focus:border-theme-primary max-[525px]:w-full'
                    placeholder='Search...'
                  />

                  <div className='flex items-center'>
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className='border p-2'
                    >
                      <option value='all'>All</option>
                      <option value='upcoming'>Upcoming</option>
                      <option value='past'>Past</option>
                    </select>
                    <button
                      onClick={() => handleSearch(1, limit)}
                      className='ml-2 rounded-sm bg-theme-primary px-5 py-[10px] text-sm text-white hover:bg-[#09286A]'
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
              {!loading && appointments?.length ? (
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  {appointments.map((appointment) => {
                    return (
                      <div key={appointment._id}>
                        <AppointmentList
                          appointments={appointment}
                          onCancel={handleCancel}
                          handleAccept={handleAccept}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : loading ? (
                <div className='grid grid-cols-1 gap-6 py-0 md:grid-cols-2 lg:grid-cols-3'>
                  {Array.from({ length: 6 }).map((item, index) => {
                    return (
                      <div key={index}>
                        <AppointmentSkeleton />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className='py-20'>
                  <ResultNotFoundUI onRetry={() => handleSearch(1, limit)} />
                </div>
              )}
            </div>
          </div>
        </div>
        {!loading && appointments?.length ? (
          <div className='flex items-center justify-center pb-2 sm:pb-4'>
            <Pagination
              current={currentPage}
              total={totalAppointments}
              pageSize={limit}
              onChange={handlePageChange}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Page;
