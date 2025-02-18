/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0f0ff',
          200: '#b9ddff',
          300: '#7cc3fc',
          400: '#36a9f8',
          500: '#0c87e0',
          600: '#0062b3',
          700: '#004c8c',
          800: '#003666',
          900: '#001f40',
        },
        secondary: {
          50: '#f4f7fb',
          100: '#e9eff7',
          200: '#cbd9eb',
          300: '#a3bcd8',
          400: '#7596bc',
          500: '#5276a3',
          600: '#3c5c89',
          700: '#2b446a',
          800: '#1d2f4c',
          900: '#0f1a2e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
}