
export interface Admin {
  id?: number;
  firstName:string;
  lastName:string;
  username: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'COLLABORATOR';
}
