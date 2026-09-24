/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#E8E9F5',
          100: '#C5C8E0',
          200: '#9499C5',
          300: '#6367A8',
          400: '#3D4088',
          500: '#2A2D6B',
          600: '#1F2155',
          700: '#14173A',
          800: '#0E1030',
          900: '#080A1F',
        },
        gold: {
          50: '#FEF9E7',
          100: '#FDF0C3',
          200: '#FAE08A',
          300: '#F5CC4E',
          400: '#EDB91F',
          500: '#E0A800',
          600: '#C49100',
          700: '#9C7200',
          800: '#755600',
          900: '#4E3A00',
        },
        ivory: '#FFFBF5',
        cream: '#FFF7E6',
        blush: '#FDF1F7',
        sky: '#F1F6FF',
        mint: '#F0FBF4',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
        tamil: ['"Noto Sans Tamil"', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 24px -4px rgba(20, 23, 58, 0.08)',
        'card': '0 8px 32px -8px rgba(20, 23, 58, 0.12)',
        'gold': '0 4px 20px -4px rgba(224, 168, 0, 0.35)',
        'gold-lg': '0 8px 32px -4px rgba(224, 168, 0, 0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0.7' },
          '70%': { transform: 'scale(1.3)', opacity: '0' },
          '100%': { transform: 'scale(1.3)', opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
