/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-bg": "url('/bg.jpg')",
      },
      blur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
