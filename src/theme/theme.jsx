import { createTheme } from "@mui/material/styles";

const serif = '"Cormorant Garamond", Georgia, serif';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#d4af37", light: "#f0d582", dark: "#8a7128", contrastText: "#181510" },
    background: { default: "#0a0908", paper: "#161413" },
    text: { primary: "#f3ece0", secondary: "#b5ab99", disabled: "#7d7466" },
    divider: "#2c2722",
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    h1: { fontFamily: serif, fontWeight: 700 },
    h2: { fontFamily: serif, fontWeight: 600 },
    h3: { fontFamily: serif, fontWeight: 600 },
    h4: { fontFamily: serif, fontWeight: 600 },
    h5: { fontFamily: serif, fontWeight: 600 },
    h6: { fontFamily: serif, fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 9 } } },
  },
});

export default theme;