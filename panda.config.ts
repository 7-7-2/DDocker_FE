import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './styled-system/**/*.{js,jsx,ts,tsx}'
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          main: { value: '#FF701E' },
          sub: { value: '#3D2D1E' },
          tertiary: { value: '#f5f5f5' },
          subtext: { value: '#a6a6a6' },
          mainDark: { value: '#313131' },
          subGrey: { value: '#DCDCDC' },
          borderGrey: { value: '#EDECEC' },
          midGrey: { value: '#767676' },
          btnGrey: { value: '#ccc' }
        },
        fontSizes: {
          xxs: { value: '10px' },
          xs: { value: '12px' },
          sm: { value: '14px' },
          base: { value: '16px' },
          lg: { value: '18px' },
          xl: { value: '20px' },
          xxl: { value: '24px' },
          xxxl: { value: '28px' }
        }
      }
    }
  },

  // The output directory for your css system
  outdir: 'styled-system',
  jsxFramework: 'react',
  syntax: 'template-literal',
  clean: true,
  logLevel: 'error'
});
