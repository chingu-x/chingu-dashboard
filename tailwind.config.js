/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-focus": "rgb(var(--primary-focus) / <alpha-value>)",
        "primary-content": "rgb(var(--primary-content) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        "secondary-focus": "rgb(var(--secondary-focus) / <alpha-value>)",
        "secondary-content": "rgb(var(--secondary-content) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-focus": "rgb(var(--accent-focus) / <alpha-value>)",
        "accent-content": "rgb(var(--accent-content) / <alpha-value>)",
        neutral: "rgb(var(--neutral) / <alpha-value>)",
        "neutral-focus": "rgb(var(--neutral-focus) / <alpha-value>)",
        "neutral-content": "rgb(var(--neutral-content) / <alpha-value>)",
        info: "rgb(var(--info) / <alpha-value>)",
        "info-content": "rgb(var(--info-content) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        "success-content": "rgb(var(--success-content) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        "warning-content": "rgb(var(--warning-content) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
        "error-content": "rgb(var(--error-content) / <alpha-value>)",
        "base-100": "rgb(var(--base-100) / <alpha-value>)",
        "base-200": "rgb(var(--base-200) / <alpha-value>)",
        "base-300": "rgb(var(--base-300) / <alpha-value>)",
        "base-content": "rgb(var(--base-content) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
