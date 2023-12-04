import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button } from "@mui/material";

export default function TopButtonsGame({ resetScore, addGame, newGameId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  
  return (
    <div className="top-buttons">
      <Button
        id="cancel-button"
        variant="outlined"
        onClick={() => {
          resetScore();
          dispatch({ type: "DELETE_GAME", payload: newGameId });
          history.push("/games");
        }}
      >
        Cancel
      </Button>{" "}
      <Button id="finish-btn" variant="outlined" onClick={addGame}>
        Finish
      </Button>
    </div>
  );
}
