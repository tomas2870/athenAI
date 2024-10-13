/** @type {import('tailwindcss').Config} */
export default {
  content: [    
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-purple-500',
    'bg-purple-300',
    'bg-purple-50',
    'bg-purple-100',
    'bg-blue-500',
    'bg-blue-300',
    'bg-blue-50',
    'bg-blue-100'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

