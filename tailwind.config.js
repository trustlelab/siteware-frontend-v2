/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // Enable dark mode using 'class'

  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'] // Add the font here
      },
      colors: {
        'primary-light': '#5c37a6',
        'dark-purple': '#42307D',
        'light-purple': '#7F56D9',
        'dark-light': '#1C2536',
        autofill: '#AC9DFC' // Change this color to your desired background color for autofilled input
      },
      boxShadow: {
        light: '-1px -2px 12px #bdbdbd38'
      }
    }
  },
  plugins: []
}
