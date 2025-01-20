/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-linear": "linear-gradient(var(--tw-gradient-stops))",
        'green-pink-gradient': 'linear-gradient(90deg, #009FB2, #00E8AE)',
      },
      boxShadow: {
        'card': '0px 10px 20px rgba(0, 0, 0, 0.15)',
      },
      fontFamily: {
        roboto: ["Roboto", "system-ui"],
        custom: ['"My Custom Font"', ...fontFamily.sans],
        poppins: ["Poppins", ...fontFamily.sans],
      },
      colors: {
        primary: "#0e7ac2",
        secondary: "#ff00d4",
        blackblue: "#1e293b",
        blackblue2: "#0f172a",
        primaryblue: "#0e7ac2",
        customGreen: "#e0f9f6",
        customDark: "#140d2f",
        customBlue: "#009FB2",
        customCian: "#00E8AE",
        textrosa: "#ff00d4",
        textblue: "#0060ff",
        tertiary: "#390763", // Mover colores adicionales aquí
      },
      textColor: {
        textrosa: "#ff00d4",
        textblue: "#0060ff",
      },
      animation: {
        "spin-slow-30": "spin 30s linear infinite",
        "spin-slow-25": "spin 25s linear infinite",
        "spin-slow-10": "spin 10s linear infinite",
        "marquee-infinite": "marquee 25s linear infinite",
        "gradient-move": "gradient-move 4s infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "gradient-move": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      backgroundSize: {
        "200%": "200%", // Extiende el tamaño del gradiente para permitir animación
      },
      fontWeight: {
        "custom-550": "550",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {},
    }),
  ],
};
