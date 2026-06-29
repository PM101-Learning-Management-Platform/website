import { setToken, storeUser } from "../lib/setToken";
import axiosInstance from "../lib/axiosInstance";

export type RegisterFormData = {
  name: string;
  date_of_birth: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function Auth() {
  // Register
  const Register = async (userData: RegisterFormData) => {
    const response = await axiosInstance.post(`/auth/register`, userData);
    return response.data;
  };

  // Login
  const Login = async (userData: { email: string; password: string }) => {
    const response = await axiosInstance.post(`/auth/login`, userData,
      {
        withCredentials: true,
      }
    );
    const data = response.data.data;
    setToken(data.accessToken);
    storeUser(data.user);
    return response.data;
  };

  // forgot password
  const ForgotPassword = async (userData: { email: string }) => {
    const response = await axiosInstance.post(`/auth/forgot-password`, userData);
    return response.data;
  };

  // Reset Password
  const ResetPassword = async (userData: {
    password: string;
    confirmPassword: string;
  }) => {
    const response = await axiosInstance.post(`/auth/reset-password`, userData);
    return response.data;
  };

  // Restore Account - Send verification code
  const RestoreAccount = async (userData: { email: string }) => {
    const response = await axiosInstance.post(`/auth/restore-account`,userData);
    return response.data;
  };

  // Verify Restore Code
  const VerifyRestoreCode = async (userData: {
    email: string;
    code: string;
  }) => {
    const response = await axiosInstance.post(`/auth/verify-restore-code`,userData);
    return response.data;
  };

  // get refresh toke
  const refreshToken = async () => {
  const response = await axiosInstance.post(`/auth/refresh`,{},{ withCredentials: true });
  const data = response.data;
  setToken(data.data.accessToken);
  return data;
};

  return {
    Login,
    Register,
    ForgotPassword,
    ResetPassword,
    RestoreAccount,
    VerifyRestoreCode,
    refreshToken,
  };
}
