/**
 * Interface representing the form input data for an appointment.
 *
 * @interface AppointMentIFormInput
 * @param {string} title - The title of the appointment.
 * @param {string} description - The description of the appointment.
 * @param {string} date - The date of the appointment in YYYY-MM-DD format.
 * @param {string} time - The time of the appointment in HH:MM format.
 */
export interface AppointMentIFormInput {
  title: string;
  description: string;
  date: string;
  time: string;
}

/**
 * Interface representing the form input data.
 *
 * @interface SignIFormInput
 * @param {string} username - The username entered by the user.
 * @param {string} password - The password entered by the user.
 */

export interface SignIFormInput {
  username: string;
  password: string;
}

/**
 * Interface representing the form input data.
 *
 * @interface IFormInput
 * @param {string} name - The name of the user.
 * @param {string} username - The username entered by the user.
 * @param {string} password - The password entered by the user.
 * @param {string} confirmPassword - The confirmation of the password entered by the user.
 */
export interface IFormInput {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}
