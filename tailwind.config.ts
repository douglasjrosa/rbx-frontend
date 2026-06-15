import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rbx: {
          brown: '#8b572a',
          'brown-deep': '#863D11',
          'brown-panel': '#772D00',
          green: '#059669',
          'green-dark': '#047857',
          'green-primary': '#155634',
          'green-secondary': '#658737',
          'green-corrugated': '#568633',
          accent: '#212121',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          md: '2rem',
        },
      },
      backgroundImage: {
        'rbx-wood': "url('/images/wood-min.webp')",
        'rbx-porto': "url('/images/porto-de-santos-optimized.avif')",
        'rbx-forest': "url('/images/floresta-min-min.webp')",
        'rbx-white': "url('/images/bg_bloco-min.webp')",
        'rbx-green': "url('/images/bg_h1.webp')",
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
