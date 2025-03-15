import React, { createContext, useContext, useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { User, Role } from "@/types";

    interface AuthContextType {
      isAuthenticated: boolean;
      user: User | null;
      login: (role: Role) => void; // login now takes a role
      logout: () => void;
    }

    const AuthContext = createContext<AuthContextType | undefined>(undefined);

    export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [user, setUser] = useState<User | null>(null);
      const navigate = useNavigate();

      const login = (role: Role) => {
        setIsAuthenticated(true);
        setUser({
          id: "dummy-user",
          name: "Dummy User",
          email: "user@example.com",
          role: role, // Use the provided role
        });
        navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      };

      const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        navigate("/login");
      };


      return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
    };

    export const useAuth = () => {
      const context = useContext(AuthContext);
      if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
      }
      return context;
    };

    export default useAuth;
