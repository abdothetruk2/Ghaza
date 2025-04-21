/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff6b6b',
          500: '#ff3b3b',
          600: '#ff0000',
          700: '#cc0000', // Main youm7 red
          800: '#a60000',
          900: '#800000',
          950: '#4c0000',
        },
        'secondary': {
          50: '#f0f8ff',
          100: '#e0f0fe',
          200: '#b9e0fe',
          300: '#7ccafb',
          400: '#36b0f7',
          500: '#0c97e9',
          600: '#0078c7',
          700: '#0060a2',
          800: '#005285',
          900: '#00456f',
          950: '#002a47',
        },
      },
      fontFamily: {
        'sans': ['Cairo', 'Arial', 'sans-serif'],
        'serif': ['Amiri', 'Times New Roman', 'serif'],
        'headline': ['Almarai', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}