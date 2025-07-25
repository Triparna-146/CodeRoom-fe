/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Main body text
        sans: ['var(--font-inter)', 'sans-serif'],
        // Headings and CTAs
        heading: ['var(--font-sora)', 'sans-serif'],
        // Code blocks and consoles
        mono: ['var(--font-fira-code)', 'monospace'],
        // Buttons and sections
        button: ['var(--font-poppins)', 'sans-serif'],
        // Hero section titles
        hero: ['var(--font-space-grotesk)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
