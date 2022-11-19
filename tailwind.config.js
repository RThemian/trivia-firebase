/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      // Configure your color palette here
      clearPurple: {
        50: "#d2a8c5",
        100: "#c892bf",
        200: "#ae6cb5",
        300: "#864ca2",
        400: "#61348f",
        500: "#42227c",
        600: "#2d166a",
        700: "#1f0f58",
        800: "#180a46",
        900: "#130734",
      },
      japaneseCoral: {
        50: "#ddc5bc",
        100: "#ddc0b8",
        200: "#dcb3af",
        300: "#d8a2a4",
        400: "#d0909b",
        500: "#c1798d",
        600: "#ab5d7b",
        700: "#8e4066",
        800: "#6d254f",
        900: "#491137",
      },
      blancaPeak: {
        50: "#d8e6cf",
        100: "#e4efde",
        200: "#fbfefa",
        300: "#ffffff",
        400: "#ffffff",
        500: "#f7fdf2",
        600: "#d6e3c3",
        700: "#b2be87",
        800: "#8f8f4c",
        900: "#5b4a1e",
      },
      hawkTurquoise: {
        50: "#9ed1bb",
        100: "#80c6b0",
        200: "#4eb1a2",
        300: "#289c96",
        400: "#0e8884",
        500: "#00756a",
        600: "#00634a",
        700: "#005229",
        800: "#00420b",
        900: "#0d3202",
      },
    },
  },

  plugins: [require("daisyui")],
};
