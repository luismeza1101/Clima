import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderColor: {
        'gray-add': '#8e8e8e'
      },
      textColor: {
        'gray-add': '#8e8e8e'
      },
      backgroundColor:{
        'black-clear': 'rgb(25, 25, 25, 54%)',
        'colorCard' : '#203289'
      },
      backgroundImage:{
        'fondo': "url(/imgs/fondo.jpeg)"
      }
    },
  },
  plugins: [],
};
export default config;
