import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:             '#FFFFFF',
        'bg-raised':    '#FAFAFA',
        surface:        '#F5F5F5',
        'surface-2':    '#EEEEEE',
        'surface-3':    '#E5E5E5',
        border:         '#E5E5E5',
        'border-mid':   '#D0D0D0',
        'border-light': '#BBBBBB',
        primary:        '#0A0A0A',
        secondary:      '#555555',
        tertiary:       '#999999',
        accent:         '#FF00C5',
        'accent-light': '#FF33D0',
        'accent-dim':   '#FCEEF9',
        'accent-2':     '#4200FF',
        'accent-2-dim': '#EEF0FF',
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        mono: ['"Roboto Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem,7vw,6rem)',         { lineHeight: '0.88',  letterSpacing: '-0.045em' }],
        'display-xl':  ['clamp(2.25rem,5vw,4.5rem)',    { lineHeight: '0.90',  letterSpacing: '-0.040em' }],
        'display-lg':  ['clamp(1.75rem,4vw,3.5rem)',    { lineHeight: '0.93',  letterSpacing: '-0.033em' }],
        'display-md':  ['clamp(1.25rem,2.5vw,2.25rem)', { lineHeight: '1.00',  letterSpacing: '-0.028em' }],
        eyebrow: ['0.625rem', { lineHeight: '1', letterSpacing: '0.22em' }],
        caption: ['0.75rem',  { lineHeight: '1.4', letterSpacing: '0.01em' }],
      },
      letterSpacing: {
        editorial: '-0.033em',
        tight:     '-0.018em',
        cap:        '0.14em',
        wide:       '0.20em',
        xwide:      '0.30em',
      },
      lineHeight: {
        display:   '0.88',
        editorial: '1.08',
        prose:     '1.68',
      },
      boxShadow: {
        'accent-sm':   '0 0 20px rgba(255,0,197,0.10)',
        'accent-md':   '0 0 40px rgba(255,0,197,0.14)',
        'accent-lg':   '0 0 72px rgba(255,0,197,0.18)',
        'inset-t':     'inset 0 1px 0 rgba(0,0,0,0.05)',
        'card':        '0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        'card-hover':  '0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.05)',
        'card-active': '0 0 0 1.5px rgba(255,0,197,0.35), 0 4px 20px rgba(0,0,0,0.08)',
        'blueprint':   'inset 0 1px 0 rgba(66,0,255,0.08)',
      },
      transitionTimingFunction: {
        'out-expo':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'blueprint': 'cubic-bezier(0.2, 0, 0, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
        '400': '400ms',
      },
    },
  },
  plugins: [],
} satisfies Config
