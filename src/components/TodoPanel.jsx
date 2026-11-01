import { Paper, Typography, Box, Checkbox, LinearProgress } from "@mui/material";
import api from "../api/client";

export default function TodoPanel({ bookings, onChanged }) {
  const total = bookings.length;
  const done = bookings.filter((b) => b.status === "done").length;

  // pending first, delivered last (date order is kept inside each group)
  const sorted = [...bookings].sort(
    (a, b) => (a.status === "done") - (b.status === "done")
  );

  const toggle = async (b) => {
    await api.patch(`/bookings/${b.id}/`, {
      status: b.status === "done" ? "booked" : "done",
    });
    onChanged();
  };

  return (
    <Paper sx={{ p: 2, border: "1px solid", borderColor: "divider" }}>
      <Typography variant="h6">To-do this month</Typography>
      <Typography variant="caption" color="text.secondary">
        {done} of {total} delivered
      </Typography>
      <LinearProgress
        variant="determinate"
        value={total ? (done / total) * 100 : 0}
        sx={{ my: 1.5, borderRadius: 1 }}
      />

      {total === 0 && (
        <Typography variant="body2" color="text.secondary">
          No events this month
        </Typography>
      )}

      {sorted.map((b) => {
        const isDone = b.status === "done";
        return (
          <Box
            key={b.id}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              py: 0.5,
              opacity: isDone ? 0.5 : 1,
            }}
          >
            <Checkbox
              size="small"
              checked={isDone}
              onChange={() => toggle(b)}
              sx={{ mt: -0.2 }}
            />
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, textDecoration: isDone ? "line-through" : "none" }}
              >
                {b.event_name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {Number(b.date.slice(8))} {b.date.slice(0, 7) && ""}
                · {b.time.slice(0, 5)} · {b.client_name}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Paper>
  );
}