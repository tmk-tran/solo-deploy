import { Button } from "@mui/material";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export default function QR_Points({ hit, targetScore, clearScores }) {
  return (
    <div style={{ textAlign: "right", fontSize: "12px" }}>
      <p>Hits: {hit}</p>
      <p style={{ fontWeight: "bold" }}>Total: {targetScore} points</p>
      <Button onClick={clearScores} style={{ color: "red" }}>
        <ClearAllIcon /> Clear
      </Button>
    </div>
  );
}
