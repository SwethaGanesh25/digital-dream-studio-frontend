import { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Alert, Grid,
} from "@mui/material";
import api from "../api/client";

const EMPTY = {
  event_name: "", client_name: "", date: "", time: "", venue: "", status: "booked",
};
const dark = { "& input": { colorScheme: "dark" } };
const shrink = { inputLabel: { shrink: true } };

export default function BookingForm({ open, onClose, onSaved, booking = null, defaultDate = "" }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setForm(
      booking
        ? { ...booking, time: booking.time.slice(0, 5) }
        : { ...EMPTY, date: defaultDate }
    );
    setError("");
  }, [open, booking, defaultDate]);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (booking) await api.put(`/bookings/${booking.id}/`, form);
      else await api.post("/bookings/", form);
      onSaved?.();
      onClose();
    } catch {
      setError("Could not save. Please fill in every field.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { component: "form", onSubmit: submit } }}
    >
      <DialogTitle>{booking ? "Edit Event" : "Add New Event"}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Grid container spacing={2} sx={{ pt: 1 }}>
          <Grid size={12}>
            <TextField label="Event name" required fullWidth value={form.event_name} onChange={set("event_name")} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Client name" required fullWidth value={form.client_name} onChange={set("client_name")} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField select label="Status" fullWidth value={form.status} onChange={set("status")}>
              <MenuItem value="booked">Booked</MenuItem>
              <MenuItem value="done">Delivered</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField type="date" label="Date" required fullWidth sx={dark}
              slotProps={shrink} value={form.date} onChange={set("date")} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField type="time" label="Time" required fullWidth sx={dark}
              slotProps={shrink} value={form.time} onChange={set("time")} />
          </Grid>
          <Grid size={12}>
            <TextField label="Venue" required fullWidth value={form.venue} onChange={set("venue")} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button type="submit" variant="contained" disabled={saving}>
          {saving ? "Saving..." : "Save Event"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}