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
          green: '#007A33',  // Cameroon Flag Green (Primary)
          yellow: '#FCD116', // Cameroon Flag Yellow (Secondary)
          red: '#CE1126',    // Cameroon Flag Red (Accents/Crisis)
          dark: '#1A1A1A',   // Text
          light: '#F4F6F0',  // Background (Slightly warm grey)
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'], // Official document look
      }
    },
  },
  plugins: [],
};
export default config;