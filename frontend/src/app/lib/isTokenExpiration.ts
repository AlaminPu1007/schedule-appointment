/**
 * To identify the token expiration
 * @param {token} get after logged in successfully
 * @return {boolean}
 */
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  exp: number;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
    const now = Date.now().valueOf() / 1000;
    return decoded.exp < now;
  } catch (error) {
    return false;
  }
};
