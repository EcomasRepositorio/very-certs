/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

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
      },
      fontFamily: {
        roboto: ["Roboto", "system-ui"],
      },
      colors: {
        primary: "#0e7ac2",
        secondary: "#ff00d4",
        blackblue: "#1e293b",
        blackblue2: "#0f172a",
        primaryblue: "#0e7ac2",
        primaryblack: "#262626",
        fondDark: "#140d2f",
      },
      textColor: {
        textrosa: "#ff00d4",
        textblue: "#0060ff",
      },
      /* certificados */
      animation: {
        "spin-slow-30": "spin 30s linear infinite",
        "spin-slow-25": "spin 25s linear infinite",
        "spin-slow-10": "spin 10s linear infinite",
        "marquee-infinite": "marquee 25s linear infinite",
        "gradient-move": "gradient-move 6s infinite",
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
      /* promas */
      animation: {
        "gradient-move": "gradient-move 6s infinite",
      },
      keyframes: {
        "gradient-move": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      backgroundSize: {
        "200%": "200%", // Extiende el tamaño del gradiente para la animación
      },
      colors: {
        primary: "#FF3F66",
        secondary: "#C83C7A",
        tertiary: "#390763",
      },
      fontFamily2: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        arial: ["Arial", "sans-serif"],
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
