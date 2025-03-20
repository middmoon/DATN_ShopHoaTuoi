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
        'color-custom-1': '#0c796e',
        'color-custom-2': '#f2faf9',
        'color-custom-3': '#000103',
        'color-custom-4': '#ffffff',
        'color-custom-5': '#fcf6f6',
        'color-custom-6': '#f9f0eb',
        'color-custom-7': 'black',

      },
    },
  },
  plugins: [],
}