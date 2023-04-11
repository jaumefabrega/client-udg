import { useEffect, useState } from "react";

import { apiClient } from "@/services/api";
import { User } from "@/interfaces";

export interface AuthI {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  userFetched: boolean;
}

// For use only once in the whole app (top level). In children, use via shared context
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userFetched, setUserFetched] = useState(false);
  const [authReqInterceptor, setAuthReqInterceptor] = useState<number | null>(
    null
  );

  // Helper function to add request interceptor that handles Bearer token
  const addReqAuthInterceptor = (token: string) => {
    // Clear previously added interceptor
    if (authReqInterceptor !== null) {
      apiClient.interceptors.request.eject(authReqInterceptor);
      setAuthReqInterceptor(null);
    }

    // Add new interceptor (synchronously!)
    const interceptor = apiClient.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      null,
      { synchronous: true }
    );

    setAuthReqInterceptor(interceptor);
  };

  // Initial load of user from localStorage
  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    const initialUserState =
      localStorageUser === null ? null : JSON.parse(localStorageUser);

    if (initialUserState) {
      addReqAuthInterceptor(initialUserState.token);
    }
    setUser(initialUserState);
    setUserFetched(true);
  }, []);

  // Login function
  const login = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    addReqAuthInterceptor(user.token);
    setUser(user);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    // Clear previously added request interceptor
    if (authReqInterceptor !== null) {
      apiClient.interceptors.request.eject(authReqInterceptor);
      setAuthReqInterceptor(null);
    }
    setUser(null);
  };

  return { user, login, logout, userFetched };
};
