// context/user-context.tsx
"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { useRouter } from "next/navigation";

interface UserContextProps {
  user: AuthenticatedUser | null;
  setUser: (user: AuthenticatedUser | null) => void;
  isLoadingUser: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<AuthenticatedUser | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const router = useRouter();

  const setUser = useCallback((newUser: AuthenticatedUser | null) => {
    setUserState(newUser);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/get-authenticated-user");
        if (response.ok) {
          const user = await response.json();
          setUser(user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch authenticated user:", error);
        setUser(null);
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUser();
  }, [setUser]);

  useEffect(() => {
    if (!isLoadingUser && !user) {
      const currentPath = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      const redirect = searchParams.get("redirect");

      if (redirect) {
        router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
      } else if (currentPath !== "/login" && currentPath !== "/register") {
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
      }
    }
  }, [isLoadingUser, user, router]);

  const value = useMemo(
    () => ({ user, setUser, isLoadingUser }),
    [user, setUser, isLoadingUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
