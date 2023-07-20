/** @type {import('tailwindcss').Config} */

const withOpacity =
  (color) =>
  ({ opacityValue }) =>
    `rgba(var(${color}), ${opacityValue ?? 1})`

const colors = {
  'royal-blue': withOpacity('--royal-blue'),
  'vibrant-orange': withOpacity('--vibrant-orange'),
  'vibrant-lime-green': withOpacity('--vibrant-lime-green'),
  'lime-green': withOpacity('--lime-green'),
  'powder-blue': withOpacity('--powder-blue'),
  'dark-midnight-blue': withOpacity('--dark-midnight-blue'),
  'midnight-blue': withOpacity('--midnight-blue'),
  'slate-blue': withOpacity('--slate-blue'),
  'lavender-gray': withOpacity('--lavender-gray'),
  'ghost-white': withOpacity('--ghost-white'),
  'pale-blue': withOpacity('--pale-blue'),
  error: withOpacity('--error'),
  grape: withOpacity('--grape'),
  white: withOpacity('--white'),
}

const keyframes = {
  'updown-threepoints': {
    '0%': { transform: 'translateY(var(--updown-threepoints-offset))' },
    '50%': {
      transform: 'translateY(calc(-1 * var(--updown-threepoints-offset)))',
    },
    '100%': { transform: 'translateY(var(--updown-threepoints-offset))' },
  },
}

const animation = {
  'updown-threepoints': 'updown-threepoints 1s infinite ease-in-out',
}

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors,
      keyframes,
      animation,
    },
  },
  plugins: [],
}
