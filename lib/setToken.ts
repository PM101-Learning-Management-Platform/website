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
};
