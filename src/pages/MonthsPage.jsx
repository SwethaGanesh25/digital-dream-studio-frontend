import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Typography, Box, Button } from "@mui/material";
import api from "../api/client";
import TileCard from "../components/TileCard";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function MonthsPage() {
  const { year } = useParams();
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});

  const now = new Date();
  const isPastYear = Number(year) < now.getFullYear();

  useEffect(() => {
    api
      .get("/bookings/summary/", { params: { year } })
      .then((res) => setCounts(res.data))
      .catch(() => setCounts({}));
  }, [year]);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button color="primary" onClick={() => navigate("/years")}>
          ‹ Years
        </Button>
        <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "center", mr: 8 }}>
          {year}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {MONTHS.map((name, i) => {
          const month = i + 1;
          const n = counts[month] || 0;
          const past =
            isPastYear ||
            (Number(year) === now.getFullYear() && month < now.getMonth() + 1);
          return (
            <Grid key={name} size={{ xs: 6, sm: 4, md: 3 }}>
              <TileCard
                title={name}
                subtitle={`${n} ${n === 1 ? "booking" : "bookings"}`}
                faded={past}
                onClick={() => navigate(`/years/${year}/${month}`)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}