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
      backgroundImage: {
        'delete': "url('https://res.cloudinary.com/dg7fmdsmw/image/upload/v1656060758/Portfolio/iconos/delete_g3pwe2.png')",
        'read': "url('https://res.cloudinary.com/dg7fmdsmw/image/upload/v1656069390/Portfolio/iconos/read_i7fhfl.png')",
        'unread': "url('https://res.cloudinary.com/dg7fmdsmw/image/upload/v1656069390/Portfolio/iconos/unread_janl1n.png')",
      },
    },
  },
  plugins: [],
}
