/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "360size": "360px",
      },
      colors: {
        "custom-dark-1" : "#070c13",
        "custom-gray-1" : "#888888",
        "custom-gray-2" : "#DADADA",
        "custom-gray-3" : "#A1A1A1",
        "custom-blue-1" : "#0063F2"
      }
    },
  },
  plugins: [],
}

