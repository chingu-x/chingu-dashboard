/** @type {import('tailwindcss').Config} */

const NEUTRAL_FOCUS_LIGHT = "#4C515B";
const NEUTRAL_FOCUS_DARK = "#A0A5AE";

module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  daisyui: {
    themes: [
      {
        light: {
          primary: "#40936D",
          "primary-focus": "#327355",
          "primary-content": "#C4DED2",
          secondary: "#A3CEE9",
          "secondary-focus": "#B1C6D4",
          "secondary-content": "#DAEAF2",
          accent: "#6EE7B7",
          "accent-focus": "#98DDBD",
          "accent-content": "#D7EDE3",
          neutral: "#6B7280",
          "neutral-focus": NEUTRAL_FOCUS_LIGHT,
          "neutral-content": "#9CA1AA",
          info: "#8FC4E5",
          "info-content": "#DCEDF7",
          success: "#14B8A6",
          "success-content": "#B6E9E3",
          warning: "#FFAC0C",
          "warning-content": "#FFE5B4",
          error: "#E6624B",
          "error-content": "#F7CEC7",
          "base-100": "#D1D3D8",
          "base-200": "#F5F5F5",
          "base-300": "#16171A",
          "base-content": "#EEEFF0",
          "--neutral-focus": NEUTRAL_FOCUS_LIGHT,
        },
      },
      {
        dark: {
          primary: "#40936D",
          "primary-focus": "#82D9B1",
          "primary-content": "#7FB79D",
          secondary: "#8FB4CC",
          "secondary-focus": "#A6D1ED",
          "secondary-content": "#697F8C",
          accent: "#61CCA2",
          "accent-focus": "#6EE7B7",
          "accent-content": "#6B9984",
          neutral: "#6B7280",
          "neutral-focus": NEUTRAL_FOCUS_DARK,
          "neutral-content": "#3B3F46",
          info: "#84B5D4",
          "info-content": "#668BA3",
          success: "#43C6B8",
          "success-content": "#0E8376",
          warning: "#FFBD3D",
          "warning-content": "#B57A09",
          error: "#EB816F",
          "error-content": "#A34635",
          "base-100": "#4C515B",
          "base-200": "#16171A",
          "base-300": "#F5F5F5",
          "base-content": "#2D3036",
          "--neutral-focus": NEUTRAL_FOCUS_DARK,
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
