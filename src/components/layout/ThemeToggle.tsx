
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 bg-background dark:bg-gray-800 text-primary dark:text-white shadow-md hover:scale-110 hover:shadow-lg"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 transition-transform duration-300 rotate-0 scale-100 dark:rotate-90 dark:scale-0" />
      ) : (
        <Sun className="w-5 h-5 transition-transform duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      )}
    </button>
  );
};

export default ThemeToggle;
