import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";

const pop = keyframes`
  from { opacity: 0; transform: scale(0.6); }
`;

const COLORS = {
  booked: { bg: "#D4AF37", fg: "#0A0908" }, // gold
  done: { bg: "#B8793A", fg: "#0A0908" }, // bronze
};

export default function DayCell({ day, status = null, count = 0, isToday = false, index = 0, onClick }) {
  const c = COLORS[status];
  return (
    <Box
      onClick={onClick}
      sx={{
        height: { xs: 52, sm: 84 },
        p: 1,
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
          boxShadow: "0 6px 18px rgba(212,175,55,0.35)",
        },
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: isToday ? 700 : 500 }}>
        {day}
      </Typography>
      {count > 0 && (
        <Typography variant="caption">
          {count} {count === 1 ? "event" : "events"}
        </Typography>
      )}
    </Box>
  );
}