import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";

const pop = keyframes`
  from { opacity: 0; transform: scale(0.6); }
`;

const COLORS = {
  enquiry: { bg: "#7aa7c7", fg: "#0A0908" }, // soft blue
  booked: { bg: "#C9A96E", fg: "#0A0908" }, // gold
  done: { bg: "#B8793A", fg: "#0A0908" }, // bronze
};

export default function DayCell({ day, status = null, count = 0, isToday = false, index = 0, onClick }) {
  const c = COLORS[status];
  return (
    <Box
      onClick={onClick}
      sx={{
        position: "relative",
        height: { xs: 52, sm: 84 },
        p: { xs: 0.5, sm: 1 },
        cursor: "pointer",
        borderRadius: 1,
        border: "1px solid",
        borderColor: isToday ? "primary.main" : "divider",
        bgcolor: c ? c.bg : "background.paper",
        color: c ? c.fg : "text.primary",
        animation: `${pop} 0.4s ease ${index * 15}ms backwards`,
        transition: "transform .2s, box-shadow .2s",
        "&:hover": {
          transform: "translateY(-3px) scale(1.05)",
          boxShadow: "0 6px 18px rgba(201,169,110,0.35)",
        },
      }}
    >
      <Typography
        variant="body1"
        sx={{ fontWeight: isToday ? 700 : 500, fontSize: { xs: 13, sm: 16 } }}
      >
        {day}
      </Typography>

      {count > 0 && (
        <>
          {/* phone: small number badge */}
          <Typography
            variant="caption"
            sx={{
              display: { xs: "block", sm: "none" },
              position: "absolute",
              right: 4,
              bottom: 2,
              fontWeight: 700,
              fontSize: 11,
            }}
          >
            {count}
          </Typography>
          {/* tablet and desktop: full text */}
          <Typography variant="caption" sx={{ display: { xs: "none", sm: "block" } }}>
            {count} {count === 1 ? "event" : "events"}
          </Typography>
        </>
      )}
    </Box>
  );
}