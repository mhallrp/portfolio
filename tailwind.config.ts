import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    keyframes: {
      slideLeft: {
        "0%": { transform: "translateX(18rem)" },
        "100%": { transform: "translateX(0rem)" },
      },
      slideRight: {
        "0%": { transform: "translateX(0rem)" },
        "100%": { transform: "translateX(18rem)" },
      },
    },
    animation: {
      "slide-left": "slideLeft 0.2s ease-out forwards",
      "slide-right": "slideRight 0.2s ease-out forwards",
    },
    extend: {
      fontFamily: {
        sans: ["nunito", "Arial", "san-serif"],
        nunito: ["nunito", "sans-serif"],
        oswald: ["oswald", "sans-serif"],
      },
      colors: {
        //primary pallete
        purple: "#7F265B",
        peach: "#FFE6C9",
        windoorsGreen: "#008080",
        hoverBlue: "#00007b",
        iconSelected: "#7F9EFF",

        //UI Grey/Black pallete
        greydark: "#484848",
        greylight: "#EAEAEA",
        greyanswer: "#F1F1F1",
        greyanswerb: "#989898",
        greytext: "#5A5A5A",
        black10: "rgba(0, 0, 0, 0.1)",
        greyTaskBar: "#C0C0C0",

        //answer card state colors
        selected: "#997088",
        correct: "#E4FFA9",
        correctBorder: "#3AB400",

        incorrect: "#FFAEA9",
        incorrectBorder: "#B40B00",
      },
      borderRadius: {
        "25px": "25px",
      },
    },
  },
  plugins: [],
};
export default config;
