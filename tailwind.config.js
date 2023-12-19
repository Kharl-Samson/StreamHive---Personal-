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
        "400size": "400px",
        "600size": "600px",
        "700size": "700px",
        "800size": "800px",
        "870size": "870px",
        "900size": "900px",
        "1220size" : "1220px",
        "1700size" : "1700px",
        "1920size" : "1920px"
      },
      colors: {
        "custom-dark-1" : "#070c13",
        "custom-dark-2" : "#141D2B",
        "custom-gray-1" : "#888888",
        "custom-gray-2" : "#DADADA",
        "custom-gray-3" : "#A1A1A1",
        "custom-gray-4" : "#AEAEAE",
        "custom-blue-1" : "#0063F2"
      }
    },
  },
  plugins: [],
}

