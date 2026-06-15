import type { User } from "../context/AuthContext";

interface UpdateUser {
  id: string;
  name?: string;
  date_of_birth?: string;
  avatar?: string;
}

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const storeUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

export const updateUser = (user: UpdateUser) => {
  localStorage.setItem("user", JSON.stringify({...getUser(), ...user}));
};