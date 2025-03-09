/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'font1':['Quintessential', 'serif'],
        'font2':['Newsreader', 'serif'],
        'font3':['Cactus Classical Serif', 'serif'],
        'font4': ['Pattaya', 'serif'], 
      },
      colors: {
        'color-custom-1': '#fefdfb',
        'color-custom-2': '#b47d8b',
        'color-custom-3': '#e3e4e4',
        'color-custom-4': '#fffaf6',
        'color-custom-5': '#fcf6f6',
        'color-custom-6': '#f9f0eb',
        'color-custom-7': 'black',

      },
    },
  },
  plugins: [],
}