import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:           '#FFFFFF',
        'bg-raised':  '#FAFAFA',
        surface:      '#F5F5F5',
        'surface-2':  '#EEEEEE',
        'surface-3':  '#E5E5E5',
        border:       '#E5E5E5',
        'border-mid': '#D0D0D0',
        'border-light':'#BBBBBB',
        primary:      '#0A0A0A',
        secondary:    '#555555',
        tertiary:     '#999999',
        accent:       '#FF00C5',
        'accent-light':'#FF33D0',
        'accent-dim': '#FCEEF9',
        'accent-2':   '#4200FF',
        'accent-2-dim':'#EEF0FF',
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        mono: ['"Roboto Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem,7vw,6rem)',      { lineHeight: '0.9',  letterSpacing: '-0.04em' }],
        'display-xl':  ['clamp(2.25rem,5vw,4.5rem)', { lineHeight: '0.92', letterSpacing: '-0.035em' }],
        'display-lg':  ['clamp(1.75rem,4vw,3.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-md':  ['clamp(1.25rem,2.5vw,2.25rem)', { lineHeight: '1.0', letterSpacing: '-0.025em' }],
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
        caption: ['0.75rem',   { lineHeight: '1.4', letterSpacing: '0.01em' }],
      },
      letterSpacing: {
        editorial: '-0.03em',
        tight:     '-0.015em',
        cap:        '0.12em',
        wide:       '0.18em',
        xwide:      '0.28em',
      },
      lineHeight: {
        display:   '0.9',
        editorial: '1.1',
        prose:     '1.65',
      },
      boxShadow: {
        'accent-sm':  '0 0 24px rgba(255,0,197,0.12)',
        'accent-md':  '0 0 48px rgba(255,0,197,0.16)',
        'accent-lg':  '0 0 80px rgba(255,0,197,0.20)',
        'inset-t':    'inset 0 1px 0 rgba(0,0,0,0.06)',
        'card':       '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)',
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
