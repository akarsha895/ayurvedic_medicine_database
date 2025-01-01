/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark-blue': '#213555',
        'new-green': '#525B44',
        'li-green': '#D3F1DF',
        'color-1':'#50808E',
        'color-2':'#69A297',
        'color-3':'#84B59F',
        'color-4':'#A3C9A8',
        'color-5':'#DDD8C4',
      },
      margin: {
        '100': '400px',
      },
    },
    
  },
  plugins: [
    require('flowbite/plugin')
]
}

