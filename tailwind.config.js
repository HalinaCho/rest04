/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          DEFAULT: '#1e40af',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        point: {
          DEFAULT: '#0891b2',
          light: '#22d3ee',
          dark: '#0e7490',
        },
        accent: {
          DEFAULT: '#f59e0b',
          dark: '#d97706',
        },
        success: '#10b981',
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        container: '1440px',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease both',
        fadeIn: 'fadeIn 0.8s ease both',
        'float-slow': 'floatY 6s ease-in-out infinite',
        'float-mid': 'floatY 4s ease-in-out infinite',
        'float-fast': 'floatY 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
