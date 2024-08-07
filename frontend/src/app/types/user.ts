/**
 * Interface representing a user.
 *
 * @interface User
 * @param {string} _id - The unique identifier for the user.
 * @param {string} name - The name of the user.
 */
export interface User {
  _id: string;
  name: string;
}

/**
 * Interface representing the properties of a User component.
 *
 * @interface UserProps
 * @param {User} user - The user object.
 */
export interface UserProps {
  user: User;
}

/**
 * Interface representing the response containing user data.
 *
 * @interface UserResponse
 * @param {User[]} users - The list of user objects.
 * @param {number} totalUsers - The total number of users.
 * @param {number} totalPages - The total number of pages.
 * @param {number} currentPage - The current page number.
 */
export interface UserResponse {
  users: User[];
  totalUsers: number;
  totalPages: number;
  currentPage: number;
}
