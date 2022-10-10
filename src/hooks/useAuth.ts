import { useCallback, useState } from "react";

export const useAuth = () => {
  const [token, setToken] = useState("");

  const login = useCallback(async () => {
    await chrome.identity.getAuthToken(
      { interactive: true },
      (token: string) => {
        setToken(token);
        chrome.storage.sync.set({
          isLogin: true,
        });
      }
    );
  }, []);

  const logout = useCallback(async () => {
    await chrome.identity.clearAllCachedAuthTokens(() => {
      setToken("");
      chrome.storage.sync.set({
        isLogin: false,
      });
    });
  }, []);

  return {
    token,
    login,
    logout,
  };
};
