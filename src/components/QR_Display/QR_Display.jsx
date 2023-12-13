import { Button, ListItemText, Typography } from "@mui/material";
// ~~~~~~~~~~~~~~~ Icons ~~~~~~~~~~~~~~~~~~
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

export default function QR_Display({ hit, miss, targetHit, targetMiss }) {
  return (
    <>
      <div
        className="trap-hit-display"
        style={{
          border: "1px solid black",
          borderRadius: "15px",
          margin: "20px auto",
          width: "50vh",
          backgroundColor: "rgb(145 227 104 / 31%)",
        }}
      >
        <ListItemText>
          <Typography variant="h5">Hits: {hit}</Typography>
        </ListItemText>
        <br />
        <ListItemText>
          <Typography variant="h6">Miss: {miss}</Typography>
        </ListItemText>
      </div>
      <div className="trap-hit-button">
        <Button
          variant="contained"
          onClick={targetHit}
          style={{
            borderRadius: "15px",
            marginBottom: "10px",
            width: "50vh",
            height: "7vh",
          }}
        >
          <ThumbUpOffAltIcon />
        </Button>
        <Button
          variant="outlined"
          onClick={targetMiss}
          style={{
            borderRadius: "15px",
            backgroundColor: "#e56969",
            color: "ghostwhite",
            width: "50vh",
            height: "7vh",
          }}
        >
          <DoDisturbAltIcon />
        </Button>
      </div>
    </>
  );
}
