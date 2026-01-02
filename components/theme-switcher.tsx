"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    setMounted(true);
    // Get theme from localStorage after mount
    const stored = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    if (stored) {
      setThemeState(stored);
    }
  }, []);

  const setTheme = (newTheme: "light" | "dark" | "system") => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);

    const root = document.documentElement;

    if (
      newTheme === "dark" ||
      (newTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      root.setAttribute("data-theme", "dark");
      root.style.colorScheme = "dark";
    } else {
      root.setAttribute("data-theme", "light");
      root.style.colorScheme = "light";
    }
  };

  // Don't render during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center gap-1 rounded-md border border-border bg-surface-100 p-1">
        <div className="inline-flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium opacity-0">
          <Sun className="h-4 w-4" />
        </div>
        <div className="inline-flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium opacity-0">
          <Moon className="h-4 w-4" />
        </div>
        <div className="inline-flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium opacity-0">
          <Monitor className="h-4 w-4" />
        </div>
      </div>
    );
  }

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
