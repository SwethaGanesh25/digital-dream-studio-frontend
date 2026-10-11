import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Typography, Box, Button } from "@mui/material";
import api from "../api/client";
import DayCell from "../components/DayCell";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const pad = (n) => String(n).padStart(2, "0");

export default function CalendarPage() {
  const { year, month } = useParams();
  const navigate = useNavigate();
  const y = Number(year);
  const m = Number(month);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api
      .get("/bookings/", { params: { year, month } })
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]));
  }, [year, month]);

  // group bookings by date: { "2026-10-15": [booking, booking] }
  const byDate = bookings.reduce((acc, b) => {
    (acc[b.date] = acc[b.date] || []).push(b);
    return acc;
  }, {});

  const daysInMonth = new Date(y, m, 0).getDate();
  const offset = new Date(y, m - 1, 1).getDay(); // blank cells before day 1
  const cells = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const today = new Date();
  const isToday = (d) =>
    d === today.getDate() && m === today.getMonth() + 1 && y === today.getFullYear();

  const dateKey = (d) => `${y}-${pad(m)}-${pad(d)}`;
  const statusOf = (list) =>
    !list ? null : list.every((b) => b.status === "done") ? "done" : "booked";

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button color="primary" onClick={() => navigate(`/years/${year}`)}>
          ‹ Months
        </Button>
        <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "center", mr: 9 }}>
          {MONTHS[m - 1]} {year}
        </Typography>
      </Box>

      <Grid container spacing={1} columns={7} sx={{ mb: 1 }}>
        {WEEKDAYS.map((w) => (
          <Grid key={w} size={1}>
            <Typography
              variant="caption"
              color="primary"
              sx={{ display: "block", textAlign: "center" }}
            >
              {w}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={1} columns={7}>
        {cells.map((d, i) => {
          const list = d ? byDate[dateKey(d)] : null;
          return (
            <Grid key={i} size={1}>
              {d && (
                <DayCell
                  day={d}
                  index={i}
                  isToday={isToday(d)}
                  status={statusOf(list)}
                  count={list ? list.length : 0}
                  onClick={() => console.log("clicked", dateKey(d))}
                />
              )}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}