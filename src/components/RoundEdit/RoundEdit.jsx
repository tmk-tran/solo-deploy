import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function RoundEdit({ replaceName, setReplaceName }) {
  return (
    <div className="round-edit">
      <Button
        onClick={() => setReplaceName(!replaceName)}
        style={{ fontSize: "10px" }}
      >
        <EditIcon />
        Edit Name
      </Button>
      <br />
    </div>
  );
}
