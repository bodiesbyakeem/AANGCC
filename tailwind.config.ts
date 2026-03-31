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
        teal: {
          DEFAULT: "#2A9D9E",
          light: "#1CCFC9",
          dark: "#1d7a7b",
        },
        gold: {
          DEFAULT: "#FFD84D",
          dark: "#e6c235",
        },
        brand: {
          black: "#000000",
          "black-2": "#0a0a0a",
          "black-3": "#111111",
          card: "#141414",
          "card-hover": "#1a1a1a",
        },
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "serif"],
        inter: ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        "2xs": ["10px", { lineHeight: "1.4" }],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      boxShadow: {
        teal: "0 0 24px rgba(42, 157, 158, 0.3)",
        gold: "0 0 24px rgba(255, 216, 77, 0.3)",
        "teal-lg": "0 0 60px rgba(42, 157, 158, 0.2)",
        "gold-lg": "0 0 60px rgba(255, 216, 77, 0.15)",
      },
      backgroundImage: {
        "gradient-teal": "linear-gradient(135deg, #1CCFC9, #2A9D9E)",
        "gradient-gold": "linear-gradient(135deg, #FFE57A, #FFD84D)",
        "gradient-dark": "linear-gradient(180deg, #000000, #0a0a0a)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      maxWidth: {
        site: "1400px",
      },
      spacing: {
        "18": "72px",
        "22": "88px",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

