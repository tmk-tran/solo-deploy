import { Button, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function GameHeader({
  replaceName,
  targetName,
  setTargetName,
  saveName,
  toggleSettings,
}) {
  return (
    <div className="game-header">
      {!replaceName ? (
        <div>
          <Typography variant="h6">{targetName}</Typography>
        </div>
      ) : (
        <input
          type="text"
          value={targetName}
          onChange={(e) => setTargetName(e.target.value)}
          onBlur={saveName}
        />
      )}
      <Button variant="contained" color="primary" onClick={toggleSettings}>
        <MoreHorizIcon />
      </Button>
    </div>
  );
}
