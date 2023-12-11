import { Button } from "@mui/material";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export default function TrapPoints({ trapHit, targetScore, clearScores }) {
  return (
    <div style={{ textAlign: "right", fontSize: "12px" }}>
      <p>Hits: {trapHit}</p>
      <p style={{ fontWeight: "bold" }}>Total: {targetScore} points</p>
      <Button onClick={clearScores} style={{ color: "red" }}>
        <ClearAllIcon /> Clear
      </Button>{" "}
    </div>
  );
}
