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
      textGray: '#6F6F6F',
      dividerGray: '#E6E6E6',
      disabledTextGray: '#B9B9B9',
      modalBackground: 'rgba(0, 0, 0, 0.5)',
    },
  },
  plugins: [],
};
