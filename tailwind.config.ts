import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          DEFAULT: "#FFD900",
          dark: "#E6C300",
        },
        muted: {
          DEFAULT: "#666666",
          dark: "#AAAAAA",
        },
        border: {
          light: "#E5E5E5",
          dark: "#333333",
          DEFAULT: "#E5E5E5",
        },
        surface: {
          light: "#F8F8F8",
          DEFAULT: "#F8F8F8",
        },
        error: "#E53E3E",
        success: "#38A169",
      },
      maxWidth: {
        content: "1280px",
      },
      animation: {
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
