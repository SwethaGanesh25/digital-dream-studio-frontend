import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Typography, Box, Button } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import api from "../api/client";
import TileCard from "../components/TileCard";
import UpcomingEvents from "../components/UpcomingEvents";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const slideIn = keyframes`
  from { opacity: 0; transform: translateX(80px); }
`;

export default function MonthsPage() {
  const { year } = useParams();
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});

  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth() + 1;

  useEffect(() => {
    api
      .get("/bookings/summary/", { params: { year } })
      .then((res) => setCounts(res.data))
      .catch(() => setCounts({}));
  }, [year]);

  return (
    <Box sx={{ animation: `${slideIn} 0.5s cubic-bezier(.2,.8,.2,1) backwards` }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button color="primary" onClick={() => navigate("/years")}>
          ‹ Years
        </Button>
        <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "center", mr: 8 }}>
          {year}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 9 }}>
          <Grid container spacing={2}>
            {MONTHS.map((name, i) => {
              const month = i + 1;
              const n = counts[month] || 0;
              const isThis = Number(year) === thisYear && month === thisMonth;
              const past =
                Number(year) < thisYear ||
                (Number(year) === thisYear && month < thisMonth);
              return (
                <Grid key={name} size={{ xs: 6, sm: 4, md: 4 }}>
                  <TileCard
                    title={name}
                    subtitle={`${n} ${n === 1 ? "booking" : "bookings"}`}
                    variant="flip"
                    index={i}
                    faded={past}
                    highlight={isThis}
                    onClick={() => navigate(`/years/${year}/${month}`)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <UpcomingEvents limit={5} />
        </Grid>
      </Grid>
    </Box>
  );
}