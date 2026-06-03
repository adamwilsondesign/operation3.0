import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#2563eb',
        'accent-light': '#3b82f6',
        surface: '#111111',
        'surface-2': '#161616',
        border: '#1e1e1e',
        'border-light': '#2a2a2a',
        primary: '#f0efe9',
        secondary: '#888888',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
