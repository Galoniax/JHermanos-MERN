import { createContext, useState, useEffect } from "react";
import {
  getMe,
  login as authLogin,
  logout as apiLogout,
} from "../services/auth.api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const user = await getMe();

        console.log(user);
        setUser(user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (email, password) => {
    const response = await authLogin(email, password);

    if (response.success) {
      const user = await getMe();
      setUser(user);
    }

    return response;
  };

  const logout = async () => {
    try {
      const response = await apiLogout();

      if (!response.success) {
        throw new Error(response.error);
      }

      setUser(null);
    } catch (err) {
      console.warn("Error al cerrar sesión en el servidor:", err);
    }
  };

  const refreshUser = async () => {
    try {
      const user = await getMe();
      setUser(user);
    } catch {
      setUser(null);
    }
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    loading,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
