/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EDEDFE",
          100: "#DDDEFA",
          200: "#BCBEF5",
          300: "#9B9EF2",
          400: "#8D91FA",
          500: "#7C80F9",
          600: "#6B6FE8",
          700: "#5A5ED7",
          800: "#4A4DC6",
          900: "#3A3CB5",
        },
        dark: "#0F0A1A",
        secondary: "#0F0A1A",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
