import { setToken, storeUser } from "../lib/setToken";
import axiosInstance from "../lib/axiosInstance";
import axios from "axios";

export type RegisterFormData = {
  name: string;
  date_of_birth: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function Auth() {

  const API_URL = import.meta.env.VITE_API_URL as string;

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
    const data = response.data;
    setToken(data.data.accessToken);
    storeUser(data.data.user);
    return data;
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
  const response = await axios.post(
    `${API_URL}/auth/refresh`,
    {},
    { withCredentials: true }
  );
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
