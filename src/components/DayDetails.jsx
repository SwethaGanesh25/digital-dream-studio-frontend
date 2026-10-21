import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, Typography, Chip,
} from "@mui/material";
import api from "../api/client";

const pretty = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
};

export default function DayDetails({ open, date, bookings, onClose, onAdd, onEdit, onChanged }) {
  const toggleDelivered = async (b) => {
    await api.patch(`/bookings/${b.id}/`, { status: b.status === "done" ? "booked" : "done" });
    onChanged();
  };

  const remove = async (b) => {
    if (!window.confirm(`Delete "${b.event_name}"?`)) return;
    await api.delete(`/bookings/${b.id}/`);
    onChanged();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{date && pretty(date)}</DialogTitle>
      <DialogContent>
        {bookings.map((b, i) => (
          <Box
            key={b.id}
            sx={{
              py: 2,
              borderTop: i > 0 ? "1px solid" : "none",
              borderColor: "divider",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6">{b.event_name}</Typography>
              <Chip
                size="small"
                label={b.status === "done" ? "Delivered" : "Booked"}
                color={b.status === "done" ? "default" : "primary"}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {b.client_name} · {b.time.slice(0, 5)} · {b.venue}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 1.5, flexWrap: "wrap" }}>
              <Button size="small" variant="outlined" onClick={() => toggleDelivered(b)}>
                {b.status === "done" ? "Mark as booked" : "Mark delivered"}
              </Button>
              <Button size="small" onClick={() => onEdit(b)}>Edit</Button>
              <Button size="small" color="error" onClick={() => remove(b)}>Delete</Button>
            </Box>
          </Box>
        ))}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button color="inherit" onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={onAdd}>+ Add another</Button>
      </DialogActions>
    </Dialog>
  );
}