"use client";

import { createContext, useContext, useMemo, useState, useEffect } from "react";

interface UserData {
  id: number;
  userName: string;
  profilePicture: string | null;
  userCustomId: string | null;
  profileName: string;
  globalRanking: number;
  balance: number;
  Auth: string;
  level: number;
  email: string;
  premiumUser: boolean;
  suspended: boolean;
  deleted: boolean;
  last_reward_collected: string;
  current_streak: number;
  lifetime_earnings: number;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultUser: UserData = {
  id: 1,
  userName: "",
  profilePicture: null,
  userCustomId: null,
  profileName: "",
  globalRanking: 1,
  balance: 1,
  Auth: "",
  level: 1,
  email: "",
  premiumUser: false,
  suspended: false,
  deleted: false,
  last_reward_collected: "",
  current_streak: 1,
  lifetime_earnings: 1,
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(() => {
    // Try to get user data from localStorage on initial load
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("userData");
      return storedUser ? JSON.parse(storedUser) : defaultUser;
    }
    return defaultUser;
  });

  // Update localStorage whenever userData changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData]);

  const contextValue = useMemo(
    () => ({
      userData,
      setUserData,
    }),
    [userData]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
