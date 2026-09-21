import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import Backendless from "../config/backendless";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: any) => void;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = user !== null;

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const currentUser = await Backendless.UserService.getCurrentUser();

        setUser(currentUser);
      } finally {
        setIsLoading(false);
      }
    };

    checkCurrentUser();
  }, []);

  const login = (user: any) => {
    setUser(user);
  };

  const logout = async () => {
    console.log("1. logout mulai");

    try {
      await Backendless.UserService.logout();

      console.log("2. backendless logout berhasil");

      setUser(null);

      console.log("3. setUser(null) berhasil");
    } catch (error) {
      console.error("4. logout ERROR:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
