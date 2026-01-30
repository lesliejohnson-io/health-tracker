/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
      },
      colors: {
        background: '#2a2829',
        card: '#383536',
        'card-hover': '#454243',
        primary: '#30a2e9',
        'primary-dark': '#2788c9',
        muted: '#8a8688',
        border: '#4a4748',
        success: '#d0dea3',
        accent: '#eaaec9',
        salmon: '#eaa095',
      },
    },
  },
  plugins: [],
}
