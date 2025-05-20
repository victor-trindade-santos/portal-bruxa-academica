import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const { user } = useContext(AuthContext);

  // Estado do tema, default Light
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Se usuário logado, pega tema do sessionStorage com chave user-specific
    if (user?.username) {
      const savedTheme = sessionStorage.getItem(`theme_${user.username}`);
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
        return;
      }
    }

    // Se não logado, pega tema do localStorage para público geral
    const savedThemePublic = localStorage.getItem("theme_public");
    if (savedThemePublic) {
      setTheme(savedThemePublic);
      document.documentElement.setAttribute("data-theme", savedThemePublic);
    } else {
      // Default light
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [user]);

  // Função para alternar tema
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);

    if (user?.username) {
      sessionStorage.setItem(`theme_${user.username}`, newTheme);
    } else {
      localStorage.setItem("theme_public", newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
