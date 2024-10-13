import API from "../../utils/API";

// Define types for the user and login/signup responses
interface User {
  id: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

// Define the response types for the service
interface PasswordResetRequestResponse {
  message: string;
}

interface ResetPasswordResponse {
  message: string;
}


// Login method
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await API.post<AuthResponse>("/auth/login", payload);
    return response.data;
  };
  
// Signup method
export const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
    const response = await API.post<AuthResponse>("/auth/signup", payload);
    return response.data;
  };
  
// Service function to request password reset
export const requestPassword = async (email: string): Promise<PasswordResetRequestResponse> => {
  const response = await API.post<PasswordResetRequestResponse>("/auth/request-password-reset", { email });
  return response.data;
};

// Service function to reset password using OTP
export const resetPassword = async (email: string, otp: string, newPassword: string): Promise<ResetPasswordResponse> => {
  const response = await API.post<ResetPasswordResponse>("/auth/reset-password", { email, otp, newPassword });
  return response.data;
};