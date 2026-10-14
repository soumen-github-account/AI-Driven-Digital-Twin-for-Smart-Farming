import { createContext, useContext, useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { getCurrentUser } from "../services/auth.service";

import { setUser, clearUser, setAuthLoading } from "../store/slices/authSlice";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [appLoading, setAppLoading] = useState(true);

  const loadCurrentUser = async () => {
    const token = localStorage.getItem("agritwin_token");

    if (!token) {
      dispatch(clearUser());
      setAppLoading(false);
      return;
    }

    try {
      dispatch(setAuthLoading(true));

      const response = await getCurrentUser();

      const currentUser = response.data.user;

      dispatch(setUser(currentUser));
    } catch (error) {
      console.error(
        "❌ Session invalid/expired:",
        error.response?.data || error.message,
      );

      localStorage.removeItem("agritwin_token");

      dispatch(clearUser());
    } finally {
      setAppLoading(false);
    }
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        appLoading,
        loadCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
};
