import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary backgrounds
        "bg-primary": "#14CFC4",
        "bg-secondary": "#0FAFA5",
        "bg-accent": "#0A8F87",

        // Accent colors
        teal: {
          DEFAULT: "#14CFC4",
          bright: "#1EDBD0",
          dark: "#0FAFA5",
          darker: "#0A8F87",
        },
        gold: {
          DEFAULT: "#FFD84D",
          hover: "#FFC800",
        },

        // Text
        "text-dark": "#111111",
        "text-muted": "rgba(255,255,255,0.7)",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        body: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-teal": "linear-gradient(135deg, #14CFC4, #0FAFA5)",
        "gradient-gold": "linear-gradient(135deg, #FFD84D, #FFC800)",
        "gradient-dark": "linear-gradient(135deg, #111111, #333333)",
      },
      boxShadow: {
        "glow-gold": "0 0 30px rgba(255, 216, 77, 0.3)",
        "glow-white": "0 0 30px rgba(255, 255, 255, 0.2)",
        "card": "0 4px 30px rgba(0, 0, 0, 0.15)",
        "card-hover": "0 16px 50px rgba(0, 0, 0, 0.2)",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
