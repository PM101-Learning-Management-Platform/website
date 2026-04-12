type User = {
  id: string;
  fullName: string;
  email: string;
  role: "student" | "instructor";
  createdAt: string;
};

const USER_STORAGE_KEY = "e_learning_user";

export const useSaveUser = () => {
  const saveUser = (userData: Omit<User, "id" | "createdAt">): User => {
    const newUser: User = {
      ...userData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  };

  const getUser = (): User | null => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as User) : null;
  };

  const loginUser = (email: string): User | null => {
    const user = getUser();
    if (user && user.email === email) return user;
    return null;
  };

  const removeUser = (): void => {
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  return { saveUser, getUser, loginUser, removeUser };
};
