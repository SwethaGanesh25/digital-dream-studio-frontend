import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, Typography, Chip,
} from "@mui/material";
import api from "../api/client";
import { serviceLabel } from "../constants/services";

const LABEL = { enquiry: "Enquiry", booked: "Confirmed", done: "Closed" };
const CHIP = { enquiry: "info", booked: "primary", done: "default" };
const NEXT = {
  enquiry: { to: "booked", text: "Confirm" },
  booked: { to: "done", text: "Mark closed" },
  done: { to: "booked", text: "Reopen" },
};

const pretty = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
};

export default function DayDetails({ open, date, bookings, onClose, onAdd, onEdit, onChanged }) {
  const advance = async (b) => {
    await api.patch(`/bookings/${b.id}/`, { status: NEXT[b.status].to });
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
              <Chip size="small" label={LABEL[b.status]} color={CHIP[b.status]} />
            </Box>
                        <Typography variant="body2" color="text.secondary">
              {serviceLabel(b.service)}
            </Typography>
            {b.notes && (
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                Notes: {b.notes}
              </Typography>
            )}
            <Box sx={{ display: "flex", gap: 1, mt: 1.5, flexWrap: "wrap" }}>
              <Button size="small" variant="outlined" onClick={() => advance(b)}>
                {NEXT[b.status].text}
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