import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'national-park-green': '#2e7d32',
        'copper-brown': '#C56C39',
        'coffee-brown': '#6F4930',
        'black-leather-jacket': '#213A1B',
        'mary-green': '#56903A',
      },
      fontFamily: {
        'schibsted-grotesk': ['Schibsted Grotesk', 'sans-serif'],
        'abril-fatface': ['Abril Fatface', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
