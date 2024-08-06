'use client';
import AppointmentList from '@/app/components/appointments/AppointmentList';
import HeaderComponent from '@/app/components/appointments/HeaderComponent';
import Api from '@/app/lib/axiosInstance';
import { Appointment } from '@/app/types/appointments';
import AppointmentSkeleton from '@/app/utils/AppointmentSkeleton ';
import ResultNotFoundUI from '@/app/utils/ResultNotFoundUI';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  /**
   * Get all appoints of current user
   * @param value
   */

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // called the api to fetch data from backend
      const { data = [] } = await Api.get('/appointments');
      setAppointments(data);
    } catch (error) {
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
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await Api.get('/appointments/search', {
        params: {
          query: searchQuery,
          filter,
        },
      });
      setAppointments(response.data);
    } catch (error) {
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
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Error canceling appointment:', error);
      }
    }
  };
  const handleAccept = async (id: string) => {
    try {
      const { data } = await Api.put(`/appointments/cancel/${id}`);
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

  return (
    <>
      <div>
        <HeaderComponent searchText={''} onSearchChange={onSearchChange} />
      </div>
      <div className='py-2'>
        <div className=''>
          <div className=''>
            <div className='container mx-auto py-4'>
              <div className='mb-4 items-center justify-between lg:flex'>
                <h1 className='mb-4 text-2xl font-bold lg:mb-0'>
                  APPOINTMENT MANAGEMENT
                </h1>
                <div className='flex items-center'>
                  <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='mr-2 border p-2 outline-none transition-all duration-300 hover:border-theme-primary focus:border-theme-primary'
                    placeholder='Search...'
                  />
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
                    onClick={handleSearch}
                    className='ml-2 rounded-sm bg-theme-primary px-5 py-[10px] text-sm text-white hover:bg-[#09286A]'
                  >
                    Search
                  </button>
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
                  <ResultNotFoundUI onRetry={() => handleSearch()} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
