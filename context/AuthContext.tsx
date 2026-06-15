import { createContext } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  date_of_birth: string;
  gender: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
