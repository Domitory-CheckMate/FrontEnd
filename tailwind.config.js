/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#000000',
      primary: '#FF6C3E',
      primary20: 'rgba(255, 108, 62, 0.2)',
      textGray: '#6F6F6F',
      textGray2: '#737373',
      dividerGray: '#E6E6E6',
      disabledTextGray: '#B9B9B9',
      modalBackground: 'rgba(0, 0, 0, 0.5)',
      invalidGray: '#F7F7F7',
      invalidTextGray: '#B9B9B9',
      defaultTextGray: '#D0D0D0'
    },
  },
  plugins: [],
};
