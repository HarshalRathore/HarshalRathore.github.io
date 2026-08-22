/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ember: '#E8A05C',
        ink: '#2B2726',
        'night-ink': '#0A1122',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['General Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
