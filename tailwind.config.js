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
      primaryBg: '#FFE2D8',
      textGray: '#6F6F6F',
      textGray2: '#737373',
      dividerGray: '#E6E6E6',
      disabledTextGray: '#B9B9B9',
      modalBackground: 'rgba(0, 0, 0, 0.5)',
      invalidGray: '#F7F7F7',
      invalidTextGray: '#B9B9B9',
      defaultTextGray: '#D0D0D0',
      subGray: '#D9D9D9',
      subGrayText: '#ABABAB',
    },
  },
  plugins: [],
};
