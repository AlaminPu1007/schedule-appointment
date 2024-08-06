/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import AppointmentList from '@/app/components/appointments/AppointmentList';
import HeaderComponent from '@/app/components/appointments/HeaderComponent';
import Api from '@/app/lib/axiosInstance';
import { debounce } from '@/app/lib/debounced';
import { getItem } from '@/app/lib/localStorage';
import { Appointment } from '@/app/types/appointments';
import ResultNotFoundUI from '@/app/utils/ResultNotFoundUI';
import UserCardSkeleton from '@/app/utils/UserCardSkeleton';
import React, { useCallback, useEffect, useState } from 'react';

const Page = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  /**
   *
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
      <div className='py-2 sm:py-4'>
        <div className=''>
          <div className=''>
            <div className='container mx-auto p-4'>
              <h1 className='mb-4 text-2xl font-bold'>
                Appointment Management
              </h1>
              <div className='mb-4'>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='mr-2 border p-2'
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
                  className='ml-2 bg-blue-500 p-2 text-white'
                >
                  Search
                </button>
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
                        <UserCardSkeleton />
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
