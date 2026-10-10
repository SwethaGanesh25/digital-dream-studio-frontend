import { Box, Typography, Divider } from "@mui/material";

export default function Masthead() {
  return (
    <Box
      component="header"
      sx={{ textAlign: "center", py: 4, px: 2, borderBottom: 1, borderColor: "divider" }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: 32, sm: 46 },
          lineHeight: 1.1,
          background: "linear-gradient(180deg, #f0d582, #d4af37 55%, #8a7128)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Digital Dream Studio
      </Typography>

      <Divider sx={{ maxWidth: 440, mx: "auto", my: 1.5, color: "primary.main" }}>✦</Divider>

      <Typography
        variant="overline"
        color="text.secondary"
        sx={{ letterSpacing: "0.16em", fontSize: { xs: 11, sm: 14 } }}
      >
        We make your special moments into memories
      </Typography>
    </Box>
  );
}