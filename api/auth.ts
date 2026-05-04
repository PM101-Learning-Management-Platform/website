import axios from "axios";
import { getToken } from '../lib/setToken';

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function Auth() {
  const API_URL = import.meta.env.VITE_API_URL as string;
  const token = getToken();

  // Register
  const Register = async (userData: RegisterFormData) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  // Login
  const Login = async (userData: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/login`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.data;

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // forgot password
  const ForgotPassword = async (userData: { email: string }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/forgot-password`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error("Forgot Password error:", error);
      throw error;
    }
  };

  // Reset Password
  const ResetPassword = async (userData: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/reset-password`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error("Reset Password error:", error);
      throw error;
    }
  };

  return { Login, Register, ForgotPassword, ResetPassword };
}
