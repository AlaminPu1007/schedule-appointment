import { UserResponse } from '../types/user';
import Api from './axiosInstance';

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
