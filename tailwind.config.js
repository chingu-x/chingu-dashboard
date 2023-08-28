/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "tech-card-container": "85.5625rem",
      },
      colors: {
        "primary-50": "#ecf4f0",
        "primary-100": "#c4ded2",
        "primary-200": "#a7cdbc",
        "primary-300": "#7fb79d",
        "primary-400": "#66a98a",
        "primary-600": "#3a8663",
        "primary-700": "#2d684d",
        "primary-800": "#23513c",
        "primary-900": "#1b3e2e",
        "neutral-50": "#F1F1F1",
      },
    },
  },
  daisyui: {
    themes: [
      {
        chingu: {
          primary: "#40936d",
          secondary: "#E6624B",
          warning: "#f6d860",
          accent: "#37cdbe",
          neutral: "#757575",
          "base-100": "#ffffff",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
