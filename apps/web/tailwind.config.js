/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../libs/ui/tailwind.config')],
  important: true,
  content: ['./src/**/*.{ts,tsx}', '../../libs/ui/**/*.{ts,tsx}'],
  theme: {},
  plugins: [],
}
