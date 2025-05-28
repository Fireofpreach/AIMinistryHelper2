const withOpacity =
  (variableName) =>
  ({ opacityValue }) =>
    opacityValue !== undefined
      ? `hsla(var(${variableName}), ${opacityValue})`
      : `hsl(var(${variableName}))`;

module.exports = {
  content: [
    "./client/src/**/*.{js,jsx,ts,tsx}",
    "./shared/**/*.{js,jsx,ts,tsx}",
    "./server/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: withOpacity("--background"),
        foreground: withOpacity("--foreground"),
        muted: withOpacity("--muted"),
        "muted-foreground": withOpacity("--muted-foreground"),
        popover: withOpacity("--popover"),
        "popover-foreground": withOpacity("--popover-foreground"),
        card: withOpacity("--card"),
        "card-foreground": withOpacity("--card-foreground"),
        border: withOpacity("--border"),
        input: withOpacity("--input"),
        primary: withOpacity("--primary"),
        "primary-foreground": withOpacity("--primary-foreground"),
        secondary: withOpacity("--secondary"),
        "secondary-foreground": withOpacity("--secondary-foreground"),
        accent: withOpacity("--accent"),
        "accent-foreground": withOpacity("--accent-foreground"),
        destructive: withOpacity("--destructive"),
        "destructive-foreground": withOpacity("--destructive-foreground"),
        ring: withOpacity("--ring"),
        "sidebar-background": withOpacity("--sidebar-background"),
        "sidebar-foreground": withOpacity("--sidebar-foreground"),
        "sidebar-primary": withOpacity("--sidebar-primary"),
        "sidebar-primary-foreground": withOpacity("--sidebar-primary-foreground"),
        "sidebar-accent": withOpacity("--sidebar-accent"),
        "sidebar-accent-foreground": withOpacity("--sidebar-accent-foreground"),
        "sidebar-border": withOpacity("--sidebar-border"),
        "sidebar-ring": withOpacity("--sidebar-ring"),
        "gradient-accent": withOpacity("--gradient-accent"),
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
    },
  },
  plugins: [],
  // Uncomment the next line if you use dynamic class names for bg-background or similar
  // safelist: ["bg-background", "text-foreground", "bg-primary", "bg-card", "bg-popover"],
};
