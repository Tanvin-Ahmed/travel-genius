import { User } from "../types";
import { createContext, ReactNode, useEffect, useState } from "react";

// Define the structure of the AuthContext
type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

// Create the default context with dummy values (will be overwritten by provider)
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // if already authenticated then after reload auth info will get form session storage
  useEffect(() => {
    const str = localStorage.getItem("auth-data");

    if (str?.trim()) {
      setUser(JSON.parse(str) as User);
    }
  }, []);

  // Login function
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("auth-data", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-data");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
