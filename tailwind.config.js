/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000a12',
        secondary: '#263238',
        tertiary: '#4f5b62'
      },
      fontFamily: {
        sans: ['Oswald', 'sans-serif']
      },
    },
  },
  plugins: [],
}
