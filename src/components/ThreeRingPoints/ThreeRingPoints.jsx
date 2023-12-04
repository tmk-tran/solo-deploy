import ClearAllIcon from "@mui/icons-material/ClearAll";
import { Button } from "@mui/material";

export default function ThreeRingPoints({
  pointsOuter,
  pointsInner,
  bulls,
  totalScore,
  clearScores,
}) {
  return (
    <div style={{ textAlign: "right", fontSize: "12px" }}>
      <p>8's: {pointsOuter}</p>
      <p>9's: {pointsInner}</p>
      <p>Bull's: {bulls}</p>
      <p style={{ fontWeight: "bold" }}>Total: {totalScore} points</p>
      <Button onClick={clearScores} style={{ color: "red" }}>
        <ClearAllIcon /> Clear
      </Button>
    </div>
  );
}
