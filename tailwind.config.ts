import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          DEFAULT: "hsl(var(--brand) / <alpha-value>)",
          50: "#E8F5F0",
          100: "#D1EBE1",
          200: "hsl(var(--brand-200) / <alpha-value>)",
          300: "hsl(var(--brand-300) / <alpha-value>)",
          400: "hsl(var(--brand-400) / <alpha-value>)",
          500: "hsl(var(--brand-500) / <alpha-value>)",
          600: "hsl(var(--brand-600) / <alpha-value>)",
          700: "#206C4A",
          800: "#164931",
          900: "#0C2619",
        },

        // Foreground (text)
        foreground: {
          DEFAULT: "hsl(var(--foreground) / <alpha-value>)",
          light: "hsl(var(--foreground-light) / <alpha-value>)",
          lighter: "hsl(var(--foreground-lighter) / <alpha-value>)",
          muted: "hsl(var(--foreground-muted) / <alpha-value>)",
        },

        // Background surfaces
        background: {
          DEFAULT: "hsl(var(--background) / <alpha-value>)",
        },
        surface: {
          100: "hsl(var(--surface-100) / <alpha-value>)",
          200: "hsl(var(--surface-200) / <alpha-value>)",
          300: "hsl(var(--surface-300) / <alpha-value>)",
        },
        overlay: "hsl(var(--overlay) / <alpha-value>)",
        control: "hsl(var(--control) / <alpha-value>)",
        button: {
          DEFAULT: "hsl(var(--button) / <alpha-value>)",
        },

        // Borders
        border: {
          DEFAULT: "hsl(var(--border) / <alpha-value>)",
          secondary: "hsl(var(--border-secondary) / <alpha-value>)",
          alternative: "hsl(var(--border-alternative) / <alpha-value>)",
          overlay: "hsl(var(--border-overlay) / <alpha-value>)",
          control: "hsl(var(--border-control) / <alpha-value>)",
          strong: "hsl(var(--border-strong) / <alpha-value>)",
          stronger: "hsl(var(--border-stronger) / <alpha-value>)",
          button: {
            DEFAULT: "hsl(var(--border-button) / <alpha-value>)",
            hover: "hsl(var(--border-button-hover) / <alpha-value>)",
          },
        },

        // Semantic colors
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          200: "hsl(var(--destructive-200) / <alpha-value>)",
          300: "hsl(var(--destructive-300) / <alpha-value>)",
          400: "hsl(var(--destructive-400) / <alpha-value>)",
          500: "hsl(var(--destructive-500) / <alpha-value>)",
          600: "hsl(var(--destructive-600) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning) / <alpha-value>)",
          200: "hsl(var(--warning-200) / <alpha-value>)",
          300: "hsl(var(--warning-300) / <alpha-value>)",
          400: "hsl(var(--warning-400) / <alpha-value>)",
          500: "hsl(var(--warning-500) / <alpha-value>)",
          600: "hsl(var(--warning-600) / <alpha-value>)",
        },
      },

      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "Circular",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: ["Source Code Pro", "monospace"],
      },

      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.4" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.6" }],
        xl: ["1.25rem", { lineHeight: "1.4" }],
        "2xl": ["1.5rem", { lineHeight: "1.4" }],
        "3xl": ["1.875rem", { lineHeight: "1.3" }],
        "4xl": ["2.25rem", { lineHeight: "1.2" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
      },

      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },

      keyframes: {
        "flash-code": {
          "0%": { backgroundColor: "rgba(52, 178, 123, 0.1)" },
          "100%": { backgroundColor: "transparent" },
        },
        slideIn: {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        spinner: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-100%)" },
        },
        "pulse-radar": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0.8" },
        },
      },

      animation: {
        "flash-code": "flash-code 1s",
        "flash-code-slow": "flash-code 2s",
        spinner: "spinner 1s linear infinite",
        marquee: "marquee 30s linear infinite",
        "marquee-vertical": "marquee-vertical 30s linear infinite",
        "pulse-radar": "pulse-radar 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-in": "slideIn 0.3s ease-out",
      },

      transitionDelay: {
        1200: "1200ms",
        1500: "1500ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
