import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base surfaces — lightest to darkest reads bottom-up
        bg:          '#0a0a0a',
        'bg-raised':  '#0d0d0d',
        surface:     '#111111',
        'surface-2': '#161616',
        'surface-3': '#1c1c1c',
        // Borders — subtle layering
        border:        '#1a1a1a',
        'border-mid':  '#242424',
        'border-light':'#2e2e2e',
        // Text
        primary:   '#f0efe9',
        secondary: '#8a8a8a',
        tertiary:  '#555555',
        // Accent — electric cobalt
        accent:       '#2563eb',
        'accent-light':'#3b82f6',
        'accent-dim':  'rgba(37,99,235,0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Display scale
        'display-2xl': ['clamp(3.5rem,8vw,7rem)',    { lineHeight: '0.9',  letterSpacing: '-0.04em' }],
        'display-xl':  ['clamp(2.75rem,6vw,5.5rem)', { lineHeight: '0.92', letterSpacing: '-0.035em' }],
        'display-lg':  ['clamp(2rem,4.5vw,4rem)',     { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-md':  ['clamp(1.5rem,3vw,2.75rem)',  { lineHeight: '1.0',  letterSpacing: '-0.025em' }],
        // Eyebrow / caption
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.2em' }],
        caption: ['0.75rem',   { lineHeight: '1.4', letterSpacing: '0.01em' }],
      },
      letterSpacing: {
        editorial: '-0.03em',
        tight:     '-0.015em',
        cap:        '0.15em',
        wide:       '0.2em',
        xwide:      '0.3em',
      },
      lineHeight: {
        display:   '0.9',
        editorial: '1.1',
        prose:     '1.65',
      },
      boxShadow: {
        'accent-sm':  '0 0 24px rgba(37,99,235,0.10)',
        'accent-md':  '0 0 48px rgba(37,99,235,0.14)',
        'accent-lg':  '0 0 80px rgba(37,99,235,0.18)',
        'inset-t':    'inset 0 1px 0 rgba(255,255,255,0.04)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart':'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
      },
    },
  },
  plugins: [],
} satisfies Config
