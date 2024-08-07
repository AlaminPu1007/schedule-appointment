import { UserResponse } from '../types/user';
import Api from './axiosInstance';

/**
 * Searches for users based on the provided query and pagination options.
 *
 * @param {string} value - The search query to filter users.
 * @param {number} [page=1] - The page number for pagination (default is 1).
 * @param {number} [limit=10] - The number of results per page (default is 10).
 * @return {Promise<UserResponse>} - A promise that resolves to the user search results.
 * @throws {Error} - Throws an error if the request fails.
 */
export const searchUser = async (
  value: string,
  page: number = 1,
  limit: number = 10
) => {
  try {
    const res = await Api.get<UserResponse>(`/users/search`, {
      params: { query: value, page, limit },
    });
    return res.data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    throw error;
  }
};
