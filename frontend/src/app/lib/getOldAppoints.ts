// this method will detect the old post
import { Appointment } from '../types/appointments';

export const getAppointmentOldPost = (appointment: Appointment) => {
  const today = new Date();

  // Extract hours and minutes from the time string
  const [hours, minutes] = appointment.time.split(':').map(Number);

  // Create a new Date object for the appointment's date
  const appointmentDateTime = new Date(appointment.date);

  // Set the hours and minutes to the appointmentDateTime
  appointmentDateTime.setHours(hours);
  appointmentDateTime.setMinutes(minutes);

  // Compare the appointment date and time with the current date and time
  return appointmentDateTime < today;
};
