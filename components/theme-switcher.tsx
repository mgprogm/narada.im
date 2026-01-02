"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-md border border-border bg-surface-100 p-1">
      <button
        onClick={() => setTheme("light")}
        className={`inline-flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium transition-colors ${
          theme === "light"
            ? "bg-brand text-white"
            : "text-foreground-light hover:text-foreground hover:bg-surface-200"
        }`}
        aria-label="Light mode"
        title="Light mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`inline-flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium transition-colors ${
          theme === "dark"
            ? "bg-brand text-white"
            : "text-foreground-light hover:text-foreground hover:bg-surface-200"
        }`}
        aria-label="Dark mode"
        title="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`inline-flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium transition-colors ${
          theme === "system"
            ? "bg-brand text-white"
            : "text-foreground-light hover:text-foreground hover:bg-surface-200"
        }`}
        aria-label="System theme"
        title="System theme"
      >
        <Monitor className="h-4 w-4" />
      </button>
    </div>
  );
}
