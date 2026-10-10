import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Masthead from "./Masthead";

export default function Layout() {
  return (
    <>
      <Masthead />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}