"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "@/utils/cookies";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: null,
    isLoading: true,
  });

  useEffect(() => {
    const token = getCookie("jwt_token");
    setAuth({
      token,
      isLoading: false,
    });
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
