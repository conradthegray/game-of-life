/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'nord-polar-night-0': '#2E3440',
        'nord-polar-night-1': '#3B4252',
        'nord-polar-night-2': '#434C5E',
        'nord-polar-night-3': '#4C566A',
        'nord-snow-storm-0': '#D8DEE9',
        'nord-snow-storm-1': '#E5E9F0',
        'nord-snow-storm-2': '#ECEFF4',
        'nord-frost-0': '#8FBCBB',
        'nord-frost-1': '#88C0D0',
        'nord-frost-2': '#81A1C1',
        'nord-frost-3': '#5E81AC',
        'nord-aurora-0': '#BF616A',
        'nord-aurora-1': '#D08770',
        'nord-aurora-2': '#EBCB8B',
        'nord-aurora-3': '#A3BE8C',
        'nord-aurora-4': '#B48EAD',
      },
    },
  },
  plugins: [],
};
