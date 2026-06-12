/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          light: "#dbeafe",
          dark: "#0369a1",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
          light: "#e2e8f0",
          dark: "#334155",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f8fafc",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        text: {
          DEFAULT: "#0f172a",
          muted: "#475569",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          light: "#bae6fd",
          dark: "#0ea5e9",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        success: "#16a34a",
        warning: "#f59e0b",
        error: "#dc2626",
        glass: {
          bg: "rgba(255, 255, 255, 0.85)",
          border: "rgba(226, 232, 240, 0.85)",
          hover: "rgba(226, 232, 240, 0.45)",
          active: "rgba(219, 234, 254, 0.4)",
        },
        brand: {
          white: "#ffffff",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
