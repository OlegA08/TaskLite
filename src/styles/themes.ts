export const theme = {
  colors: {
    background: "#ffffff",
    surface: "#fafafa",
    text: "#1a1a1a",
    textMuted: "#757575",
    border: "#e5e5e5",

    accent: "#9b79cf",
    accentHover: "#674c8c",

    error: "#bf616a",
    success: "#4caf91",
    warning: "#ebcb8b"
  },
  spacing: (f: number) => `${f * 8}px`,
  radius: {
    sm: "4px",
    md: "6px",
    lg: "8px"
  },
  font: {
    family: "'Inter', system-ui, sans-serif",
    size: {
      xs: "10px",
      sm: "14px",
      md: "15px",
      lg: "18px"
    },
    weight: {
      regular: 400,
      medium: 500,
      bold: 600
    }
  }
};