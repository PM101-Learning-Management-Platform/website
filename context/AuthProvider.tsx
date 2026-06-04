import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { type User } from "./AuthContext";
import { getToken, getUser } from "../lib/setToken";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(() => {
    const token = getToken();
    if (token) {
      return getUser();
    }
    return null;
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
