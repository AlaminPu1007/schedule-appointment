/**
 * This component will render appointment list
 */

import { getAppointmentOldPost } from '@/app/lib/getOldAppoints';
import { getItem } from '@/app/lib/localStorage';
import { AppointmentListProps } from '@/app/types/globalTypes';
import React from 'react';

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments: appointment,
  onCancel,
  handleAccept,
}) => {
  // get userId from local-storage
  const userId = getItem('userId');

  return (
    <div className='mb-1 rounded-lg border bg-white p-4 text-center shadow-md transition-all duration-300 hover:border-theme-primary md:min-h-[280px]'>
      <h2 className='mb-1 text-xl font-bold'>{appointment.title}</h2>
      <p>{appointment.description}</p>
      <p>
        <span className='font-semibold'>Date:</span>{' '}
        {new Date(appointment.date).toLocaleDateString()}
      </p>
      <p>
        <span className='font-semibold'>Time:</span> {appointment.time}
      </p>
      <p>
        <span className='font-semibold'>Scheduler:</span>{' '}
        {appointment.scheduler.name || "None"}
      </p>
      <p>
        <span className='font-semibold'>Attendee:</span>{' '}
        {appointment.attendee.name || "None"}
      </p>
      <p>
        <span className='font-semibold'>Status:</span> {appointment.status}
      </p>
      {!getAppointmentOldPost(appointment) ? (
        <div className='mt-3 flex w-full items-center justify-center'>
          {appointment.scheduler._id === userId &&
            appointment.status === 'pending' && (
            <button
              className='custom-btn'
              onClick={() => onCancel(appointment._id)}
            >
              Cancel
            </button>
          )}
          {appointment.attendee._id === userId &&
          appointment.status === 'pending' && (
            <button
              className='custom-btn'
              onClick={() => handleAccept(appointment._id)}
            >
              Accept
            </button>
          )}
        </div>
      ) : (
        <div className='mt-3 text-red-500'>
          <p>This appointment is past and cannot be modified.</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
