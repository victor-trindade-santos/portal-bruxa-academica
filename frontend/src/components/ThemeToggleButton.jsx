import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import styles from '../css/ThemeToggleButton.module.css'

function ThemeToggleButton({ className }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className={styles.themeToggle}>
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

export default ThemeToggleButton;
