import { Appointment } from './appointments';

/**
 * Interface representing the properties of the HeaderComponent.
 *
 * @interface HeaderComponentProps
 * @param {string} searchText - The current search text input by the user.
 * @param {function} onSearchChange - Callback function to handle changes in the search text.
 * @param {string} onSearchChange.value - The new search text value.
 * @return {void} onSearchChange - No return value.
 */
export interface HeaderComponentProps {
  searchText: string;
  onSearchChange: (value: string) => void;
}

/**
 * Interface representing the properties of the AppointmentList component.
 *
 * @interface AppointmentListProps
 * @param {Appointment} appointments - List of appointment objects.
 * @param {function} onCancel - Callback function to handle the cancellation of an appointment.
 * @param {string} onCancel.id - The ID of the appointment to cancel.
 * @return {void} onCancel - No return value.
 * @param {function} handleAccept - Callback function to handle the acceptance of an appointment.
 * @param {string} handleAccept.id - The ID of the appointment to accept.
 * @return {void} handleAccept - No return value.
 */
export interface AppointmentListProps {
  appointments: Appointment;
  onCancel: (id: string) => void;
  handleAccept: (id: string) => void;
}
