/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: {
          50: "#e7f7e7",
          100: "#ceefce",
          200: "#9dde9d",
          300: "#85d685",
          400: "#6cce6c",
          500: "#54c654",
          600: "#3bbd3b",
          700: "#23b523",
          800: "#0aad0a",
          900: "#088a08",
          950: "#066806 ",
        },
        lightColor: "#f0f3f2",
        RatingColor: "#ffc908",
      },
      fontFamily: {
        tlight: ["Tajawal-Light", "sans-serif"],
        tregular: ["Tajawal-Regular", "sans-serif"],
        tmedium: ["Tajawal-Medium", "sans-serif"],
        tbold: ["Tajawal-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
