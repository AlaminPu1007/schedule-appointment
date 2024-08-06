import { User } from './user';

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

export interface GetAppointMentsProps {
  totalAppointments: number;
  totalPages: number;
  currentPage: number;
  appointments: Appointment[];
}
