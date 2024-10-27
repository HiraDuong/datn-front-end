import { UserRole } from '../../utils/constants.util';

export interface UserModel {
  id?: number;
  username: string;
  email: string;
  password: string;
  salt: string;
  role: UserRole;
  avatar: string;
}
export interface UserSearchTerm {
  username: string | null;
  email: string | null;
}
