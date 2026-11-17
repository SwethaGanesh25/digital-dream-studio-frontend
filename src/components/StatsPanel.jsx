import { useEffect, useState } from "react";
import { Paper, Typography, Box } from "@mui/material";
import api from "../api/client";

const ITEMS = [
  { key: "enquiries", label: "Enquiries", color: "#7aa7c7" },
  { key: "confirmed", label: "Events confirmed", color: "#c9a96e" },
  { key: "closed", label: "Events closed", color: "#b8793a" },
];

export default function StatsPanel({ title, year, month, refreshKey }) {
  const [stats, setStats] = useState({});

  useEffect(() => {
    api
      .get("/bookings/stats/", { params: { year, month } })
      .then((res) => setStats(res.data))
      .catch(() => setStats({}));
  }, [year, month, refreshKey]);

  return (
    <Paper sx={{ p: 2, border: "1px solid", borderColor: "divider" }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      {ITEMS.map((it, i) => (
        <Box
          key={it.key}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            py: 1.2,
            borderTop: i > 0 ? "1px solid" : "none",
            borderColor: "divider",
          }}
        >
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: it.color }} />
          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
            {it.label}
          </Typography>
          <Typography variant="h5" sx={{ color: it.color }}>
            {stats[it.key] ?? 0}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
}