import { useState, useEffect, useCallback } from "react";


export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = JSON.parse(localStorage.getItem("darkMode"));
    return savedMode !== null ? savedMode : false;
  });

 
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.body.classList.toggle("dark", newMode);
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  }, []);

  
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return { darkMode, toggleDarkMode };
};
