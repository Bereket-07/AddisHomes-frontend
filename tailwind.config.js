/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          muted: "var(--bg-muted)",
          accent: "var(--accent)",
          border: "var(--border)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        // Legacy support
        primary: "var(--bg-primary)",
        accent: "var(--accent)",
        secondary: "var(--bg-secondary)",
        gold: {
          400: "var(--accent)",
          500: "var(--accent)",
          600: "var(--accent)",
        },
      },
    },
  },
  plugins: [],
};