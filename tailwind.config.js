/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E8E9FC',
          400: '#9FA2F8',
          500: '#7D80F4',
          600: '#5C5FF0',
          700: '#3B3EEC',
        },
        dark: '#201a41',
        secondary: '#201a41',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
