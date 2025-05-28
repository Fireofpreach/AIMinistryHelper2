import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./public/**/*.html"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        sidebar_background: "hsl(var(--sidebar-background))",
        sidebar_foreground: "hsl(var(--sidebar-foreground))",
        sidebar_primary: "hsl(var(--sidebar-primary))",
        sidebar_primary_foreground: "hsl(var(--sidebar-primary-foreground))",
        sidebar_accent: "hsl(var(--sidebar-accent))",
        sidebar_accent_foreground: "hsl(var(--sidebar-accent-foreground))",
        sidebar_border: "hsl(var(--sidebar-border))",
        sidebar_ring: "hsl(var(--sidebar-ring))",
      },
      borderColor: {
        border: "hsl(var(--border))",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
    },
  },
  plugins: [],
};

export default config;

