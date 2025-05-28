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
        primary: withOpacity("--primary"),
        "primary-foreground": withOpacity("--primary-foreground"),
        secondary: withOpacity("--secondary"),
        "secondary-foreground": withOpacity("--secondary-foreground"),
        accent: withOpacity("--accent"),
        "accent-foreground": withOpacity("--accent-foreground"),
        destructive: withOpacity("--destructive"),
        "destructive-foreground": withOpacity("--destructive-foreground"),
        background: withOpacity("--background"),
        foreground: withOpacity("--foreground"),
        muted: withOpacity("--muted"),
        "muted-foreground": withOpacity("--muted-foreground"),
        border: withOpacity("--border"),
        input: withOpacity("--input"),
        ring: withOpacity("--ring"),
        card: withOpacity("--card"),
        "card-foreground": withOpacity("--card-foreground"),
        sidebar_background: withOpacity("--sidebar-background"),
        sidebar_foreground: withOpacity("--sidebar-foreground"),
        sidebar_primary: withOpacity("--sidebar-primary"),
        sidebar_primary_foreground: withOpacity("--sidebar-primary-foreground"),
        sidebar_accent: withOpacity("--sidebar-accent"),
        sidebar_accent_foreground: withOpacity("--sidebar-accent-foreground"),
        sidebar_border: withOpacity("--sidebar-border"),
        sidebar_ring: withOpacity("--sidebar-ring"),
      },
    },
  },
  plugins: [
    // e.g., require('@tailwindcss/forms'),
  ],
};
