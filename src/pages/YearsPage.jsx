import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Box, IconButton, Button } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import api from "../api/client";
import TileCard from "../components/TileCard";
import BookingForm from "../components/BookingForm";

const FIRST_YEAR = 2026; // earliest year shown
const SHOW = 10; // years on screen at a time
const fadeDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
`;

export default function YearsPage() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});
  const [formOpen, setFormOpen] = useState(false);
  const current = new Date().getFullYear();
  const [start, setStart] = useState(FIRST_YEAR);

  const loadCounts = useCallback(() => {
    api
      .get("/bookings/years/")
      .then((res) => setCounts(res.data))
      .catch(() => setCounts({}));
  }, []);

  useEffect(() => {
    loadCounts();
  }, [loadCounts]);

  const years = Array.from({ length: SHOW }, (_, i) => start + i);
  const arrow = {
    transition: "transform .2s",
    "&:hover": { transform: "scale(1.3)" },
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mb: 3,
          animation: `${fadeDown} 0.6s ease backwards`,
        }}
      >
        <IconButton
          color="primary"
          sx={arrow}
          disabled={start <= FIRST_YEAR}
          onClick={() => setStart(Math.max(FIRST_YEAR, start - SHOW))}
        >
          <Typography variant="h4">‹</Typography>
        </IconButton>
        <Typography variant="h5">
          {years[0]} – {years[SHOW - 1]}
        </Typography>
        <IconButton color="primary" sx={arrow} onClick={() => setStart(start + SHOW)}>
          <Typography variant="h4">›</Typography>
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" onClick={() => setFormOpen(true)}>
          + Add Event
        </Button>
      </Box>

      {/* key={start} replays the animation when you press an arrow */}
      <Grid container spacing={2} key={start}>
        {years.map((year, i) => {
          const n = counts[year] || 0;
          return (
            <Grid key={year} size={{ xs: 6, sm: 4, md: 2.4 }}>
              <TileCard
                title={year}
                subtitle={`${n} ${n === 1 ? "booking" : "bookings"}`}
                faded={year < current}
                highlight={year === current}
                index={i}
                onClick={() => navigate(`/years/${year}`)}
              />
            </Grid>
          );
        })}
      </Grid>

      <BookingForm open={formOpen} onClose={() => setFormOpen(false)} onSaved={loadCounts} />
    </Box>
  );
}