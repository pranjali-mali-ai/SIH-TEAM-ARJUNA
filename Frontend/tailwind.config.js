/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        arjuna: {
          bg: '#0b1220',
          panel: '#111c2b',
          panelAlt: '#0f172a',
          border: '#1f2d3d',
          accent: '#38bdf8',
          accentSoft: '#0ea5e9',
          success: '#22c55e',
          warning: '#f59e0b',
          danger: '#ef4444',
          text: '#e5eefb',
          muted: '#8ea3bf',
          strong: '#f8fbff'
        }
      },
      boxShadow: {
        soft: '0 0 0 1px rgba(148, 163, 184, 0.14), 0 8px 20px rgba(15, 23, 42, 0.18)'
      }
    }
  },
  plugins: []
}
