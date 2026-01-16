/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f1419',
        card: '#1a1f2e',
        'card-hover': '#252b3b',
        primary: '#22d3ee',
        'primary-dark': '#06b6d4',
        muted: '#64748b',
        border: '#2d3748',
      },
    },
  },
  plugins: [],
}
