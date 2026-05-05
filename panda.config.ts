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
          darkGrey: { value: '#555555' },
          btnGrey: { value: '#ccc' },
          reportGrey: { value: '#cbcbcb' },
          deleteRed: { value: '#f3372b' }
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
        },
        zIndex: {
          footer: { value: 10 },
          headers: { value: 10 },
          contentsBtn: { value: 20 },
          floatingBtn: { value: 30 },
          backgroundLayer: { value: 100 },
          actionBtn: { value: 180 },
          modal: { value: 200 }
        }
      },
      keyframes: {
        like: {
          '0%': {
            opacity: '0',
            transform: 'scale(0)'
          },
          '15%': {
            opacity: '0.9',
            transform: 'scale(1.2)'
          },
          '30%': {
            transform: 'scale(0.95)'
          },
          '45%, 80%': {
            opacity: '0.9',
            transform: 'scale(1)'
          },
          '100%': {
            opacity: '1'
          }
        },
        loader: {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          }
        },

        popup_bottom: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '10%': { transform: 'translateY(4px)', opacity: '1' },
          '25%': { transform: 'translateY(12px)', opacity: '1' },
          '50%': { transform: 'translateY(18px)', opacity: '1' },
          '75%': { transform: 'translateY(12px)', opacity: '1' },
          '90%': { transform: 'translateY(4px)', opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },

        popup_top: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '15%': { transform: 'translateY(20px)', opacity: '0' },
          '35%': { transform: 'translateY(60px)', opacity: '0' },
          '50%': { transform: 'translateY(90px)', opacity: '0.2' },
          '65%': { transform: 'translateY(60px)', opacity: '0.5' },
          '85%': { transform: 'translateY(20px)', opacity: '0.8' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
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
