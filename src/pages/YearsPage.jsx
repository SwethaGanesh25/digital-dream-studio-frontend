import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";

export default function YearsPage() {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid>
        <Typography color="text.secondary">Years (coming next)</Typography>
      </Grid>
      <Grid>
        <Button variant="outlined" color="inherit" onClick={signOut}>
          Sign out
        </Button>
      </Grid>
    </Grid>
  );
}