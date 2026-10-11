// import { Card, CardActionArea, Typography } from "@mui/material";

// export default function TileCard({ title, subtitle, onClick, faded = false }) {
//   return (
//     <Card
//       sx={{
//         bgcolor: "background.paper",
//         border: "1px solid",
//         borderColor: "divider",
//         opacity: faded ? 0.4 : 1,
//         transition: "opacity 0.2s",
//         "&:hover": { borderColor: "primary.main", opacity: 1 },
//       }}
//     >
//       <CardActionArea onClick={onClick} sx={{ py: 4, textAlign: "center" }}>
//         <Typography variant="h4" color="primary">
//           {title}
//         </Typography>
//         {subtitle && (
//           <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//             {subtitle}
//           </Typography>
//         )}
//       </CardActionArea>
//     </Card>
//   );
// }

import { Card, CardActionArea, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";

const rise = keyframes`
  from { opacity: 0; transform: translateY(40px) scale(0.85); }
`;
const flip = keyframes`
  from { opacity: 0; transform: perspective(700px) rotateX(-80deg) translateY(-20px); }
`;
const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); }
  50% { box-shadow: 0 0 22px 2px rgba(212,175,55,0.45); }
`;
const ANIM = { rise, flip };

export default function TileCard({
  title,
  subtitle,
  onClick,
  faded = false,
  highlight = false,
  variant = "rise", // "rise" or "flip"
  index = 0,
}) {
  const delay = index * 70;
  const entrance = `${ANIM[variant]} 0.7s cubic-bezier(.2,.8,.2,1) ${delay}ms backwards`;
  const glow = highlight ? `, ${pulse} 2.4s ease-in-out ${delay + 800}ms infinite` : "";

  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        transformOrigin: "top center",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: highlight ? "primary.main" : "divider",
        opacity: faded ? 0.4 : 1,
        animation: entrance + glow,
        transition: "transform .3s, box-shadow .3s, border-color .3s, opacity .3s",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-120%",
          width: "60%",
          height: "100%",
          background:
            "linear-gradient(120deg, transparent, rgba(212,175,55,0.25), transparent)",
          transition: "left .8s",
          pointerEvents: "none",
        },
        "&:hover": {
          transform: "translateY(-8px) scale(1.04)",
          boxShadow: "0 12px 30px rgba(212,175,55,0.35)",
          borderColor: "primary.main",
          opacity: 1,
        },
        "&:hover::after": { left: "130%" },
      }}
    >
      <CardActionArea onClick={onClick} sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h4" color="primary">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </CardActionArea>
    </Card>
  );
}