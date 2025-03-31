import type { Config } from 'tailwindcss';
import { colors } from './constants';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        purple: colors.purple,
        divider: colors.divider,
        iconGrey: colors.iconGrey,
      },
      fontFamily: {
        public_sans: ['var(--font-public-sans)'],
      },
    },
  },
  plugins: [],
};
export default config;
