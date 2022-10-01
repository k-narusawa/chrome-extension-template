import { useCallback, useState } from "react";

export const useAuth = () => {
  const [token, setToken] = useState("init");

  const auth = useCallback(() => {
    chrome.identity.getAuthToken({ interactive: true }, (token: string) => {
      setToken(token);
    });
  }, []);

  return {
    auth,
    token,
  };
};
