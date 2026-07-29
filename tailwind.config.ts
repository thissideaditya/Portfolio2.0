import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D0D0D",
        surface: "#161616",
        "surface-hover": "#1F1F1F",
        border: "#272727",
        foreground: "#FFFFFF",
        muted: "#8B8B8B",
        /** Fill colour for the "ghost" half of the oversized hero headline. */
        ghost: "#2B2B2B",
        accent: "#EF3E10",
        "accent-soft": "#FF6A3D",
        card: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      letterSpacing: {
        widest2: "0.2em",
      },
      borderRadius: {
        card: "28px",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "rise-in": "rise-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "draw-arc": "draw-arc 1.6s ease-out 0.3s both",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw-arc": {
          "0%": { strokeDashoffset: "1200" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
