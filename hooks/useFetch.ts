import axios from "axios";

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export async function useFetch() {
  const API_URL = import.meta.env.VITE_API_URL as string;
  const response = await fetch(`${API_URL}`);
  const data = await response.json();
  return data as User[];
}

export function useRegister() {
  const API_URL = import.meta.env.VITE_API_URL as string;

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

  return { Register };
}

export function useLogin() {
  const API_URL = import.meta.env.VITE_API_URL as string;
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

  return { Login };
}
