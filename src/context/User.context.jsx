import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const saveToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const clearToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Optional: If you want to log changes to the token
  useEffect(() => {
    // You can add any side effects here if necessary
    console.log("Token changed:", token);
  }, [token]);

  return (
    <UserContext.Provider value={{ token, saveToken, clearToken }}>
      {children}
    </UserContext.Provider>
  );
}