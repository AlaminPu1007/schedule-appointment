export interface User {
  _id: string;
  name: string;
}

export interface UserProps {
  user: User;
}

export interface UserResponse {
  users: User[];
  totalUsers: number;
  totalPages: number;
  currentPage: number;
}
