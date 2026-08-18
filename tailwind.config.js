export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1B4A2B',
          mid: '#255C36',
          deep: '#123521',
          dark: '#0C2416',
        },
        gold: {
          DEFAULT: '#B8964F',
          light: '#D2B475',
          pale: '#E7D9B4',
          deep: '#8C6E32',
        },
        ivory: {
          DEFAULT: '#FBF9F4',
          parchment: '#F0E9DA',
          warm: '#F6F1E6',
        },
        ink: {
          DEFAULT: '#2C352D',
          muted: '#5B6A5D',
          faint: '#8E998F',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Cabin', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.26em',
        nav: '0.16em',
        button: '0.18em',
      },
      maxWidth: {
        estate: '1360px',
        prose: '68ch',
      },
      borderRadius: {
        DEFAULT: '0px',
        sm: '1px',
        md: '2px',
      },
      transitionTimingFunction: {
        estate: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      boxShadow: {
        frame: '0 1px 0 0 rgba(184,150,79,0.35)',
      },
    },
  },
  plugins: [],
}
