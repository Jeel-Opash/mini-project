import React, { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    darkMode: localStorage.getItem("darkMode") === "true",
    adsEnabled: true,
    emailNotifications: true,
    maintenanceMode: false,
  });

  useEffect(() => {
    document.body.classList.toggle("dark", settings.darkMode);
    localStorage.setItem("darkMode", settings.darkMode);
  }, [settings.darkMode]);

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <ThemeContext.Provider value={{ settings, toggleSetting }}>
      {children}
    </ThemeContext.Provider>
  );
};
