import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        otherworld: {
          100: "#DFC9FF",
          200: "#BD91FE",
          300: "#8947EE",
          400: "#352551",
          500: "#271C3C",
          600: "#160E22",
        },
        dash: {
          100: "#E1FDF5",
          200: "#92FFDE",
          300: "#1AEEB0",
          400: "#023B36",
          500: "#002D29",
          600: "#001B1E",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
