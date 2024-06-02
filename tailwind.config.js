/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      lb:'#b79c7d',
      white: '#e6e8e6',
      db:'#a27745'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    fontSize:{
      'normal':'14px',
      'mid': '24px',
      veryLarge:'62px',
      verySmall:"11px"
    },
    extend: {},
  },
  plugins: [],
}

