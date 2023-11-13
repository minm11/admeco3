/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    zIndex:{
      '100':'100',
      '200':'200',
      '300':'300',
      '400':'400',
      '500':'500',
    },
    fontFamily: { 
      lato: ['Lato', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}

