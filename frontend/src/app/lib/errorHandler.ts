/**
 * A global axios error handler method.
 * @param {error}, that will produce by axios
 */

import { toast } from 'react-toastify';
import { CustomAxiosError } from './axiosInstance';

export const handleError = (error: CustomAxiosError) => {
  const errorMessage =
    error?.response?.data?.message ||
    'Something went wrong. Please try again later.';
  toast.error(errorMessage);

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(errorMessage);
  }
};
