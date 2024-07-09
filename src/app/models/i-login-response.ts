import { Admin } from './i-admins';
export interface LoginResponse {
  jwt: string;
  admin: Admin;
}
