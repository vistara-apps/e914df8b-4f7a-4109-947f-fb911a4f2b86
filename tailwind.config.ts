import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design system color tokens from PRD
        bg: "hsl(210, 30%, 95%)",
        surface: "hsl(0, 0%, 100%)",
        primary: "hsl(210, 80%, 55%)",
        accent: "hsl(140, 70%, 50%)",
        profit: "hsl(140, 70%, 40%)",
        loss: "hsl(350, 70%, 50%)",
        "text-primary": "hsl(210, 30%, 15%)",
        "text-secondary": "hsl(210, 30%, 45%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
