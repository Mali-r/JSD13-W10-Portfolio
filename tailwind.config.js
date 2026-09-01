/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#313647',
          dark: '#242836',
          light: '#3d4359',
        },
        slate: {
          DEFAULT: '#435663',
          dark: '#33424d',
          light: '#536b7b',
        },
        sage: {
          DEFAULT: '#A3B087',
          dark: '#8b996f',
          light: '#bdcbb3',
        },
        cream: {
          DEFAULT: '#FFF8D4',
          dark: '#ebe2bd',
          light: '#fffae3',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
