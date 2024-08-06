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
    <div className='mb-4 rounded-lg border bg-white p-4 shadow-md'>
      <h2 className='text-xl font-bold'>{appointment.title}</h2>
      <p>{appointment.description}</p>
      <p>
        Date: {new Date(appointment.date).toLocaleDateString()} Time:{' '}
        {appointment.time}
      </p>
      <p>Scheduler: {appointment.scheduler.name}</p>
      <p>Attendee: {appointment.attendee.name}</p>
      <p>Status: {appointment.status}</p>
      {!getAppointmentOldPost(appointment) ? (
        <div>
          {appointment.scheduler._id === userId && (
            <button onClick={() => onCancel(appointment._id)}>Cancel</button>
          )}
          {appointment.attendee._id === userId &&
            appointment.status === 'pending' && (
            <button onClick={() => handleAccept(appointment._id)}>
            Accept
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default AppointmentList;
