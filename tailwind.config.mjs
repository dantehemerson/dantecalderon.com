export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Gentium Book Plus', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        brand: {
          primary: '#1976d2',
          'primary-dark': '#004ba0',
          'primary-hover': '#156CB8',
          secondary: '#f44336',
          'secondary-dark': '#ba000d',
          'secondary-hover': '#D63A2F',
        },
        body: '#052d3f',
        link: '#4a90e2',
      },
    },
  },
  plugins: [],
}
