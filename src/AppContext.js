import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [userCredentials, setUserCredentials] = useState(null);

  // Load user from localStorage on app initialization
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserCredentials(JSON.parse(storedUser)); // Parse and set user
    }
  }, []);

  // Log out function to clear user credentials
  function logout() {
    localStorage.removeItem("user");
    setUserCredentials(null);
  }

  return (
    <AppContext.Provider
      value={{ userCredentials, setUserCredentials, logout }}>
      {children}
    </AppContext.Provider>
  );
}
