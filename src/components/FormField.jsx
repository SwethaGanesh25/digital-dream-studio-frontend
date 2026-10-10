// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Alert, Button, Grid, Paper, Typography } from "@mui/material";
// import api from "../api/client";
// import FormField from "../components/FormField";

// export default function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const [busy, setBusy] = useState(false);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setBusy(true);
//     try {
//       const { data } = await api.post("/auth/login/", form);
//       localStorage.setItem("access", data.access);
//       localStorage.setItem("refresh", data.refresh);
//       navigate("/years");
//     } catch (err) {
//       setError(
//         err.response?.status === 401
//           ? "Wrong username or password."
//           : "Can't reach the server. Is Django running?"
//       );
//     } finally {
//       setBusy(false);
//     }
//   };

//   return (
//     <Grid container justifyContent="center" sx={{ mt: 4 }}>
//       <Grid size={{ xs: 12, sm: 8, md: 5 }}>
//         <Paper
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{ p: 3, border: 1, borderColor: "divider" }}
//         >
//           <Grid container spacing={2}>
//             <Grid size={12}>
//               <Typography variant="h4" color="primary.light">Sign in</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Open your booking calendar
//               </Typography>
//             </Grid>

//             <Grid size={12}>
//               <FormField
//                 label="Username"
//                 name="username"
//                 value={form.username}
//                 onChange={handleChange}
//                 autoComplete="username"
//                 required
//               />
//             </Grid>

//             <Grid size={12}>
//               <FormField
//                 label="Password"
//                 name="password"
//                 type="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 autoComplete="current-password"
//                 required
//               />
//             </Grid>

//             {error && (
//               <Grid size={12}>
//                 <Alert severity="error">{error}</Alert>
//               </Grid>
//             )}

//             <Grid size={12} sx={{ textAlign: "right" }}>
//               <Button type="submit" variant="contained" disabled={busy}>
//                 {busy ? "Signing in…" : "Sign in"}
//               </Button>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// }

import { TextField } from "@mui/material";

// Pass any TextField prop: type, value, onChange, required, select, children...
export default function FormField({ label, ...props }) {
  return <TextField label={label} fullWidth size="small" {...props} />;
}