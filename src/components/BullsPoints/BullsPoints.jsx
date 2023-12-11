import { Button } from "@mui/material";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export default function BullsPoints({ bulls, totalScore, clearScores }) {
  return (
    <div style={{ textAlign: "right", fontSize: "12px" }}>
      <p>Bull's: {bulls}</p>
      <p style={{ fontWeight: "bold" }}>Total: {totalScore} points</p>
      <Button onClick={clearScores} style={{ color: "red" }}>
        <ClearAllIcon /> Clear
      </Button>
    </div>
  );
}
