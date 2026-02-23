import type {Config} from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0F1B2D",
          gold: "#C6A85A",
          bg: "#F6F4EF",
          ink: "#16171A",
          card: "#FFFFFF",
          border: "#E5E1D7",
          muted: "#5F626A",
          whatsapp: "#25D366",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 27, 45, 0.08)",
      },
    },
  },
} satisfies Config;
