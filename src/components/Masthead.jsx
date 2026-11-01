import { Box, Typography, Divider } from "@mui/material";

export default function Masthead() {
  return (
    <Box
      component="header"
      sx={{ textAlign: "center", py: { xs: 4, sm: 6 }, px: 2, borderBottom: 1, borderColor: "divider" }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: 44, sm: 72, md: 96 },
          lineHeight: 1.05,
          background: "linear-gradient(180deg, #ead9ae, #c9a96e 55%, #9a7b3f)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Digital Dream Studios
      </Typography>

      <Divider sx={{ maxWidth: 520, mx: "auto", my: 2, color: "primary.main" }}>✦</Divider>

      <Typography
        variant="overline"
        color="white"
        sx={{ letterSpacing: "0.18em", fontSize: { xs: 25, sm: 27 } }}
      >
        We make your memories special
      </Typography>
    </Box>
  );
}