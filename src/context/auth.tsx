"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  const FIXED_CREDENTIALS = {
    email: "admin@example.com",
    password: "admin@123",
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(savedUser);
  }, []);

  const login = (email: string, password: string) => {
    if (
      email === FIXED_CREDENTIALS.email &&
      password === FIXED_CREDENTIALS.password
    ) {
      localStorage.setItem("user", email);
      setUser(email);
      router.push("/marketplace");
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
