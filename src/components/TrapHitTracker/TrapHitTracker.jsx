import { Button, Card, CardContent, Typography } from "@mui/material";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";

export default function TrapHitTracker({ trapHit, hit }) {
  return (
    <Card className="trap-hit-card">
      <CardContent>
        <div className="trap-hit-display">
          <Typography
            variant="h5"
            style={{
              backgroundColor: "orange",
              borderRadius: "10px",
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            25
          </Typography>
          <br />
          <Typography variant="h6">Hits: {trapHit}</Typography>
        </div>
        <div className="trap-hit-button">
          <Button variant="contained" onClick={hit}>
            <ModeStandbyIcon />
            Hit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
