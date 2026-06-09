import type { User } from "../context/AuthContext";

// set token in local storage after login
export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

// get token from local storage
export const getToken = () => {
  return localStorage.getItem("token");
};

// remove token from local storage
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