// this method will detect the old post
import { Appointment } from '../types/appointments';

/**
 * Checks if the given appointment is in the past.
 *
 * @param {Appointment} appointment - The appointment object to check.
 * @param {string} appointment.date - The date of the appointment in YYYY-MM-DD format.
 * @param {string} appointment.time - The time of the appointment in HH:MM format.
 * @return {boolean} - Returns true if the appointment is in the past, otherwise false.
 */

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
