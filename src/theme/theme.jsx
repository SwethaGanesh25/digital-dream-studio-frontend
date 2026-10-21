import { createTheme } from "@mui/material/styles";

const serif = '"Cormorant Garamond", Georgia, serif';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#c9a96e", light: "#e8d5a8", dark: "#9a7b3f", contrastText: "#1c1812" },
    background: { default: "#1a1712", paper: "#242019" },
    text: { primary: "#f3ece0", secondary: "#b5ab99", disabled: "#7d7466" },
    divider: "#3b352b",
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