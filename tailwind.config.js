/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030014",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#7000ff",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#00d4ff",
          foreground: "#000000",
        },
        accent: {
          DEFAULT: "#ff00d4",
          foreground: "#ffffff",
        },
        glass: "rgba(255, 255, 255, 0.05)",
        "glass-border": "rgba(255, 255, 255, 0.1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "orbit": "orbit 20s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(150px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(150px) rotate(-360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: 1, filter: "brightness(1) blur(0px)" },
          "50%": { opacity: 0.8, filter: "brightness(1.5) blur(2px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
}
