/**
 * This component will render appointment list
 */

import { getAppointmentOldPost } from '@/app/lib/getOldAppoints';
import { getItem } from '@/app/lib/localStorage';
import { Appointment } from '@/app/types/appointments';
import React from 'react';

interface AppointmentListProps {
  appointments: Appointment;
  onCancel: (id: string) => void;
  handleAccept: (id: string) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments: appointment,
  onCancel,
  handleAccept,
}) => {
  // get userId from local-storage
  const userId = getItem('userId');

  return (
    <div className='mb-1 rounded-lg border bg-white p-4 shadow-md md:min-h-[250px]'>
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
        {appointment.scheduler.name}
      </p>
      <p>
        <span className='font-semibold'>Attendee:</span>{' '}
        {appointment.attendee.name}
      </p>
      <p>
        <span className='font-semibold'>Status:</span> {appointment.status}
      </p>
      {!getAppointmentOldPost(appointment) ? (
        <div className='mt-3 flex w-full items-center justify-between'>
          {appointment.scheduler._id === userId && (
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
      ) : null}
    </div>
  );
};

export default AppointmentList;
