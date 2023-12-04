import {
    FormControl,
    Button,
  } from "@mui/material";

export default function AddRoundButton({ addRound }) {
  return (
    <FormControl className="form-control" fullWidth>
      <Button
        variant="contained"
        onClick={addRound} // Make sure the button adds a round
      >
        Add Round
      </Button>
    </FormControl>
  );
}
