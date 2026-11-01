import { useEffect, useState } from "react";
import { Paper, Typography, Box } from "@mui/material";
import api from "../api/client";

const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOT = { booked: "#c9a96e", done: "#b8793a" };

const fmt = (iso) => {
  const [y, m, d] = iso.split("-");
  return `${d} ${SHORT[Number(m) - 1]} ${y}`;
};

export default function UpcomingEvents({ limit = 5 }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("/bookings/upcoming/", { params: { limit } })
      .then((res) => setItems(res.data))
      .catch(() => setItems([]));
  }, [limit]);

  return (
    <Paper sx={{ p: 2, border: "1px solid", borderColor: "divider" }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Upcoming Events
      </Typography>

      {items.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No upcoming events
        </Typography>
      )}

      {items.map((b, i) => (
        <Box
          key={b.id}
          sx={{
            display: "flex",
            gap: 1.5,
            py: 1.5,
            borderTop: i > 0 ? "1px solid" : "none",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: DOT[b.status],
              mt: 0.7,
              flexShrink: 0,
            }}
          />
          <Box>
            <Typography variant="caption" color="text.secondary">
              {fmt(b.date)} · {b.time.slice(0, 5)}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {b.event_name}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
              {b.client_name} · {b.venue}
            </Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  );
}