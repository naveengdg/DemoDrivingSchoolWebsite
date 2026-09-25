/**
 * Vetri Driving Academy — Tailwind CSS Design System Configuration
 * =================================================================
 * Role & Purpose:
 * - Defines the custom automotive color palette in OKLCH color space:
 *     • road: Deep asphalt slate for high-contrast typography and cards.
 *     • amber: Premium safety gold for badges, highlights, and primary CTAs.
 *     • steel: Neutral metallic grey for borders, metadata, and subtitles.
 *     • cream: Warm, easy-on-the-eyes background tone.
 *     • success: Traffic-green for verified RTO badges and WhatsApp links.
 * - Configures typography families ('Clash Display' for headings, 'Inter' for body).
 * - Customizes box shadows, border radii, and responsive breakpoints.
 */

import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        road: {
          DEFAULT: 'oklch(0.25 0.02 260 / <alpha-value>)',
          light: 'oklch(0.35 0.02 260 / <alpha-value>)',
          lighter: 'oklch(0.45 0.02 260 / <alpha-value>)',
        },
        amber: {
          DEFAULT: 'oklch(0.75 0.18 85 / <alpha-value>)',
          dark: 'oklch(0.65 0.18 85 / <alpha-value>)',
          light: 'oklch(0.85 0.12 85 / <alpha-value>)',
          pale: 'oklch(0.92 0.06 85 / <alpha-value>)',
        },
        steel: {
          DEFAULT: 'oklch(0.55 0.06 250 / <alpha-value>)',
          light: 'oklch(0.75 0.04 250 / <alpha-value>)',
          lighter: 'oklch(0.88 0.02 250 / <alpha-value>)',
        },
        cream: {
          DEFAULT: 'oklch(0.98 0.005 85 / <alpha-value>)',
          dark: 'oklch(0.94 0.01 85 / <alpha-value>)',
        },
        success: {
          DEFAULT: 'oklch(0.65 0.15 150 / <alpha-value>)',
          light: 'oklch(0.85 0.08 150 / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        card: '0 4px 24px oklch(0.25 0.02 260 / 0.08)',
        'card-hover': '0 12px 40px oklch(0.25 0.02 260 / 0.14)',
        header: '0 1px 12px oklch(0.25 0.02 260 / 0.08)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
