/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-focus": "var(--primary-focus)",
        "primary-content": "var(--primary-content)",
        secondary: "var(--secondary)",
        "secondary-focus": "var(--secondary-focus)",
        "secondary-content": "var(--secondary-content)",
        accent: "var(--accent)",
        "accent-focus": "var(--accent-focus)",
        "accent-content": "var(--accent-content)",
        neutral: "var(--neutral)",
        "neutral-focus": "var(--neutral-focus)",
        "neutral-content": "var(--neutral-content)",
        info: "var(--info)",
        "info-content": "var(--info-content)",
        success: "var(--success)",
        "success-content": "var(--success-content)",
        warning: "var(--warning)",
        "warning-content": "var(--warning-content)",
        error: "var(--error)",
        "error-content": "var(--error-content)",
        "base-100": "var(--base-100)",
        "base-200": "var(--base-200)",
        "base-300": "var(--base-300)",
        "base-content": "var(--base-content)",
      },
    },
  },
  plugins: [],
};
