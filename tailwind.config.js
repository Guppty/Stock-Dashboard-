module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        white: "white",
        none: "none",
      },
      borderWidth: {
        1: "1px",
      },
      fontFamily : {
        quicksand : ["Quicksand","sans-serif"],
      },
      gridTemplateRows: {
        7: "repeat(7, mimax(0,1fr))",
        8: "repeat(7, mimax(0,1fr))",
      },
    },
  },
  plugins: [],
};
