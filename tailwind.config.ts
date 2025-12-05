import type { Config } from "tailwindcss";

const config: Config = {
content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        official: {
          blue: '#003366', // Deep Navy (Trust)
          gold: '#D4AF37', // Gold (Authority)
          red: '#8B0000',  // Dark Red (Crisis Mode)
          gray: '#F5F5F5', // Light Gray (Background)
        },
      },
    },
  },
  plugins: [],
};
export default config;