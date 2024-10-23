/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        body: ['Lato', 'sans-serif'],
        nav: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: "#83B735",
        secondary: "#438e44",
      },
      container:{ 
        center: true,
        padding:{ 
          DEFAULT: "1rem",
          sm: "3rem",
        }
      },
      height: {
        'hero-height': '455px',
        'upper-banner-height': '250px',
      },
    },
  },
  plugins: [nextui()],
}

