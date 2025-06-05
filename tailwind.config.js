/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // <-- important, to enable class-based dark mode toggling
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 4s linear infinite', 
      },
      keyframes: { 
      },
    },
  },
  plugins: [],
}
