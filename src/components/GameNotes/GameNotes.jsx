import { TextField, Typography } from "@mui/material";

export default function GameNotes({
  isEdit,
  saveNotes,
  setGameNotes,
  gameNotes,
  setIsEdit,
}) {
  return (
    <>
      {isEdit ? (
        // Render an input field in edit mode
        <TextField
          type="text"
          label="Game Notes"
          placeholder="Game Notes"
          // value={gameNotes}
          onChange={(e) => setGameNotes(e.target.value)}
          onBlur={saveNotes}
        />
      ) : (
        // Render the round title
        <>
          {/* <GameTimer /> gameId={game_id} */}
          <Typography
            id="notes-edit"
            variant="h7"
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          >
            {gameNotes}
          </Typography>
        </>
      )}
    </>
  );
}
