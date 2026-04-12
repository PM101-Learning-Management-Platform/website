export function useSetLoggedIn() {
  const setLoggedIn = () => {
    localStorage.setItem("isLoggedIn", "true");
  };

  const isLoggedIn = () => {
    return localStorage.getItem("isLoggedIn") === "true";
  };

  return { setLoggedIn, isLoggedIn };
}
