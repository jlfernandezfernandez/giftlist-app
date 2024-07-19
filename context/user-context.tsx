"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { AuthenticatedUser } from "@/types/authenticated-user";
import { useRouter } from "next/navigation";

interface UserContextProps {
  user: AuthenticatedUser | null;
  setUser: (user: AuthenticatedUser | null) => void;
  isLoadingUser: boolean;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  isLoadingUser: true,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/get-authenticated-user");
        if (!response.ok) {
          throw new Error("Failed to fetch authenticated user");
        }
        const user = await response.json();
        setUser(user);
      } catch (error) {
        console.error("Failed to fetch authenticated user:", error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUser();
  }, [router]);

  useEffect(() => {
    if (!isLoadingUser && !user) {
      router.push("/login");
    }
  }, [isLoadingUser, user, router]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoadingUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
