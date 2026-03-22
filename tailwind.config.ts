import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nexus: {
          bg: '#0A0C10',
          surface: { base: '#161920', elevated: '#222631' },
          accent: { primary: '#00E6E6', secondary: '#B8FF2E' },
          text: { primary: '#F3F4F6', secondary: '#9CA3AF' },
          border: { subtle: '#2D3342' },
          status: {
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
          },
        },
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      boxShadow: { 'elevation-1': '0 4px 6px -1px rgba(0,0,0,0.5)' },
      borderRadius: { sm: '4px', md: '8px', lg: '12px' },
    },
  },
  plugins: [],
}

export default config
