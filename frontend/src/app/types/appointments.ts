import { User } from './user';

/**
 * Interface representing an appointment.
 *
 * @interface Appointment
 * @param {string} _id - The unique identifier for the appointment.
 * @param {string} title - The title of the appointment.
 * @param {string} description - The description of the appointment.
 * @param {string} date - The date of the appointment in YYYY-MM-DD format.
 * @param {string} time - The time of the appointment in HH:MM format.
 * @param {User} scheduler - The user who scheduled the appointment.
 * @param {User} attendee - The user who is attending the appointment.
 * @param {string} status - The status of the appointment (e.g., confirmed, cancelled).
 */
export interface Appointment {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  scheduler: User;
  attendee: User;
  status: string;
}

/**
 * Interface representing the properties for fetching appointments.
 *
 * @interface GetAppointMentsProps
 * @param {number} totalAppointments - The total number of appointments.
 * @param {number} totalPages - The total number of pages.
 * @param {number} currentPage - The current page number.
 * @param {Appointment[]} appointments - The list of appointment objects.
 */
export interface GetAppointMentsProps {
  totalAppointments: number;
  totalPages: number;
  currentPage: number;
  appointments: Appointment[];
}
