/** @type {import('tailwindcss').Config} */

const withOpacity =
  (color) =>
  ({ opacityValue }) =>
    `rgba(var(${color}), ${opacityValue ?? 1})`

const shadCnUiColors = {
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
  },
  secondary: {
    DEFAULT: 'hsl(var(--secondary))',
    foreground: 'hsl(var(--secondary-foreground))',
  },
  destructive: {
    DEFAULT: 'hsl(var(--destructive))',
    foreground: 'hsl(var(--destructive-foreground))',
  },
  muted: {
    DEFAULT: 'hsl(var(--muted))',
    foreground: 'hsl(var(--muted-foreground))',
  },
  accent: {
    DEFAULT: 'hsl(var(--accent))',
    foreground: 'hsl(var(--accent-foreground))',
  },
  popover: {
    DEFAULT: 'hsl(var(--popover))',
    foreground: 'hsl(var(--popover-foreground))',
  },
  card: {
    DEFAULT: 'hsl(var(--card))',
    foreground: 'hsl(var(--card-foreground))',
  },
}

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
  'light-gray': withOpacity('--light-gray'),
  'ghost-white': withOpacity('--ghost-white'),
  'pale-blue-gray': withOpacity('--pale-blue-gray'),
  'pale-blue': withOpacity('--pale-blue'),
  error: withOpacity('--error'),
  grape: withOpacity('--grape'),
  white: withOpacity('--white'),
  ...shadCnUiColors,
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

const width = {
  'app-max': '1040px',
}

const animation = {
  'updown-threepoints': 'updown-threepoints 1s infinite ease-in-out',
}

const height = {
  header: '84px',
  footer: '176px',
}

const minHeight = {
  main: 'calc(100vh - 84px - 176px)',
}

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height,
      minHeight,
      width,
      colors,
      keyframes,
      animation,
    },
  },
  plugins: [],
}
