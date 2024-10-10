// auth.types.ts

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
