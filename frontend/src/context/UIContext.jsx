import React, { createContext, useContext, useState, useMemo } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      sidebarOpen,
      toggleSidebar,
    }),
    [theme, sidebarOpen]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => useContext(UIContext);
