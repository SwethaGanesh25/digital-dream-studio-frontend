import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, Chip, Grid, IconButton, InputAdornment,
  Paper, TextField, Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import api from "../api/client";
import { serviceLabel } from "../constants/services";

const LABEL = { enquiry: "Enquiry", booked: "Confirmed", done: "Closed" };
const CHIP = { enquiry: "info", booked: "primary", done: "default" };
const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const fmt = (iso) => {
  const [y, m, d] = iso.split("-");
  return `${d} ${SHORT[Number(m) - 1]} ${y}`;
};

export default function ClientsPage() {
  const navigate = useNavigate();
  const dateRef = useRef(null);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);

  // wait 300ms after typing, then ask the backend
  useEffect(() => {
    const timer = setTimeout(() => {
      api
        .get("/bookings/", {
          params: { search: search || undefined, date: date || undefined },
        })
        .then((res) => setResults(res.data))
        .catch(() => setResults([]));
    }, 300);
    return () => clearTimeout(timer);
  }, [search, date]);

  const openPicker = () => {
    const el = dateRef.current;
    if (!el) return;
    if (el.showPicker) el.showPicker();
    else el.click();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button color="primary" onClick={() => navigate("/years")}>
          ‹ Years
        </Button>
        <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "center", mr: 8 }}>
          Clients
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 560, mx: "auto", mb: 1, position: "relative" }}>
        <TextField
          fullWidth
          placeholder="Search by client name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton color="primary" onClick={openPicker} aria-label="Pick a date">
                    <CalendarMonthIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        {/* hidden native date picker, opened by the calendar icon */}
        <input
          ref={dateRef}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            position: "absolute", right: 0, bottom: 0,
            width: 0, height: 0, opacity: 0, pointerEvents: "none",
          }}
        />
      </Box>

      <Box sx={{ maxWidth: 560, mx: "auto", mb: 3, minHeight: 32 }}>
        {date && (
          <Chip label={`Date: ${fmt(date)}`} color="primary" variant="outlined" onDelete={() => setDate("")} />
        )}
      </Box>

      {results.length === 0 && (
        <Typography color="text.secondary" sx={{ textAlign: "center" }}>
          No clients found
        </Typography>
      )}

      <Grid container spacing={2}>
        {results.map((b) => (
          <Grid key={b.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Paper sx={{ p: 2, height: "100%", border: "1px solid", borderColor: "divider" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="h6">{b.client_name}</Typography>
                <Chip size="small" label={LABEL[b.status]} color={CHIP[b.status]} />
              </Box>
              <Typography variant="body2">{b.event_name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {serviceLabel(b.service)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {fmt(b.date)} · {b.time.slice(0, 5)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {b.venue}
              </Typography>
              {b.notes && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Notes: {b.notes}
                </Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}