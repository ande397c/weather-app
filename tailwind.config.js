/** @type {import('tailwindcss').Config} */
export default {
 content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
 theme: {
  colors: {
   black: "#000000",
   white: "#FFFFFF",
   darkGrey: "#1C1C1E",
   lightGrey: "#9898A0",
   blue: "#3E80C1",
   red: "#FF453A",
  },
  height: {
   "frontpage-height": "calc(100vh - 190px)",
  },
 },
 plugins: [],
};
