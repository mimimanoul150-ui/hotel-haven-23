import { createContext, useContext, useState, ReactNode } from "react";
import { User, mockUser } from "@/data/mockData";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  loginAdmin: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string) => {
    // Mock login
    setUser({ ...mockUser, email });
    return true;
  };

  const loginAdmin = (email: string, _password: string) => {
    setUser({ id: "admin1", name: "Admin", email, role: "admin" });
    return true;
  };

  const signup = (name: string, email: string, _password: string) => {
    setUser({ id: "new_" + Date.now(), name, email, role: "client" });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, loginAdmin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
