/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      cursor: {
        'magnifying-glass': 'url(/magnifying-glass-plus.svg), pointer',
      },
      backgroundImage: {
        '404-bg-gradient':
          'radial-gradient(147.4% 134.75% at 3.12% 104.87%, #E9C8F4 0%, #99BEF9 47.21%)',
        'button-gradient':
          'linear-gradient(93.75deg, #45C0F0 0%, #DF56D8 123.13%)',
      },
      borderRadius: {
        '4xl': '2rem', // 32px
        '5xl': '2.5rem', // 40px
        '6xl': '3rem', // 48px
      },
      borderWidth: {
        1.5: '1.5px',
      },
      transitionProperty: {
        height: 'height',
      },
      letterSpacing: {
        tight: '-.0075em',
      },
      spacing: {
        '4.5': '1.125rem',
        '6.5': '1.625rem',
        '7': '28px',
        '7.5': '1.875rem',
        '13': '52px',
        '14': '56px',
        '15': '60px',
        '17': '68px',
        '22': '88px',
        '25': '100px',
        '28': '112px',
        '30': '120px',
        '50': '200px',
        '55': '220px',
        '100': '25rem',
        '105': '420px',
      },
      scale: {
        '200': '2.00',
      },
      keyframes: {
        slideStoriesAppear: {
          '0%': {bottom: '-10rem', opacity: 0},
          '100%': {bottom: 0, opacity: 1},
        },
        slideStoriesDisappear: {
          '0%': {bottom: 0, opacity: 1},
          '50%': {bottom: '20rem', opacity: 0},
          '100%': {bottom: '-20rem', opacity: 0},
        },
      },
      colors: {
        gray: {
          100: '#FFFFFF',
          200: '#E6E7E8',
          300: '#B1B3B9',
          400: '#75787F',
          500: '#33353F',
          600: '#20222C',
          700: '#090D18',
          800: '#F0F0FF',
        },
        tone: {
          50: '#E6EAF7',
          100: '#FBFCFD',
          200: '#FDFBFC',
          300: '#E1DCF3',
          400: '#C6B7FF',
          500: '#A087FF',
          600: '#8260FF',
          700: '#6439FF',
          800: '#4E1DFE',
          900: '#233635',
        },
        rose: {
          500: '#F43764',
        },
      },
      minHeight: {
        14: '3.5rem',
      },
      screens: {
        mm: '23.4375rem', // 375px
        sm: '37.5rem', // 600px
        md: '64rem', // 1024px
        xm: '72rem', // 1161px
        lg: '80rem', // 1280px
        xl: '94.5rem', // 1512px
        '2xl': '108rem', // 1728px
        '3xl': '120rem', // 1920px
        smh: {raw: '(min-height: 35rem)'}, // 560px
      },
      fontFamily: {
        sfPro: ['var(--font-sf-pro)', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem' /* 10px */, '0.75rem' /* 12px */],
        xs: ['0.75rem' /* 12px */, '1rem' /* 16px */],
        s: ['0.875rem' /* 14px */, '1.25rem' /* 20px */],
        m: ['1rem' /* 16px */, '1.5rem' /* 24px */],
        l: ['1.125rem' /* 18px */, '1.5rem' /* 24px */],
        xl: ['1.375rem' /* 22px */, '1.75rem' /* 28px */],
        '2xl': ['1.75rem' /* 28px */, '2.25rem' /* 36px */],
        '3xl': ['2rem' /* 32px */, '2.25rem' /* 36px */],
        '4xl': ['2.5rem' /* 40px */, '2.75rem' /* 44px */],
        '5xl': ['3.5rem' /* 56px */, '3.75rem' /* 60px */],
        '6xl': ['4.5rem' /* 72px */, '4.5rem' /* 72px */],
      },
      gridTemplateColumns: {
        cols1fr2fr: '1fr 2fr',
      },
    },
  },
  plugins: [require('tailwindcss-convert-px-to-rem')],
};
