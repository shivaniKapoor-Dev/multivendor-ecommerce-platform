/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // Adjust to your file structure
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
         inconsolata: ['Inconsolata', 'monospace'],
         barrio: [ "Barrio", "system-ui"],
         KalniaGlaze: ['Kalnia Glaze'],
      },
    },
  },
  plugins: [],
}
