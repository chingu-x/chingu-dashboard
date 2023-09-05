/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  daisyui: {
    themes: [
      {
        chingu: {
          primary: "#40936D",
          "primary-focus": "#3A8663",
          "primary-content": "#C4DED2",
          secondary: "#C2DAE9",
          "secondary-focus": "#B1C6D4",
          "secondary-content": "#ECF4F8",
          accent: "#A7F3D0",
          "accent-focus": "#98DDBD",
          "accent-content": "#E4FBF0",
          neutral: "#757575",
          "neutral-focus": "#535353",
          "neutral-content": "#919191",
          info: "#8FC4E5",
          "info-content": "#DCEDF7",
          success: "#14B8A6",
          "success-content": "#B6E9E3",
          warning: "#FFAC0C",
          "warning-content": "#FFE5B4",
          error: "#E6624B",
          "error-content": "#F7CEC7",
          "base-100": "#D4D4D4",
          "base-200": "#C0C0C0",
          "base-300": "#A3A3A3",
          "base-content": "#F1F1F1",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
