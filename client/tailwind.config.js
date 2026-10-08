/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        parch: "#F3F0EA",
        pitch: "#121110",
        bordeau: "#A4243B",
        green: "#058c42",
        gray: "#1E1712",
        carbon: "#222725",
      },
    },
  },
  plugins: [],
};