import React from "react";
import { useHistory } from "react-router-dom";
import GameTimer from "../GameTimer/GameTimer"; // timer keeps resetting, figure out issue
import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  CardContent,
  TextField,
  FormControl,
  Button,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import ClearAllIcon from "@mui/icons-material/ClearAll";
// ~~~~~~~~~~~~~~~ Utils ~~~~~~~~~~~~~~~~~~
import { StyledTableCell, StyledTableRow, formatDate } from "../Utils/helpers";

export default function RoundTracker({
  showSettings,
  setShowSettings,
  isEdit,
  setIsEdit,
  replaceName,
  setReplaceName,
  roundName,
  setRoundName,
  roundScores,
  setRoundScores,
  roundHeaders,
  setRoundHeaders,
  totalRoundScores,
  setTotalRoundScores,
  roundNumber,
  setRoundNumber,
  notes,
  setNotes,
  totalScore,
  setTotalScore,
  gameDate,
  setGameDate,
  gameNotes,
  setGameNotes,
  targetName,
  setTargetName,
  targetScore,
  setTargetScore,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  // Bring in Rounds
  const rounds = useSelector((store) => store.roundReducer);
  console.log("SCORES: ", rounds);
  const roundIds = rounds.map((round, i) => {
    // Check if it's the last score in the array
    if (i === rounds.length - 1) {
      // You've reached the last score, so you can extract the ID
      const rId = round.round_id;
      return rId;
    }
    // If it's not the last object, return null or undefined, or handle it as needed.
    return null;
  });
  // Extract the last round's ID
  const roundId = roundIds.filter((round_id) => round_id !== null)[0];
  console.log("Round ID = ", roundId);

  // Bring in Games
  const games = useSelector((store) => store.gamesReducer);
  console.log("GAMES: ", games);
  const gameIds = games.map((game, i) => {
    // Check if it's the last game in the array
    if (i === games.length - 1) {
      // You've reached the last game, so you can extract the ID
      const newId = game.game_id;
      return newId;
    }
    // If it's not the last game, return null or undefined, or handle it as needed.
    return null;
  });

  // Extract the last game's ID
  const newGameId = gameIds.filter((game_id) => game_id !== null)[0];
  console.log("New Game ID:", newGameId); // not logging correctly right now

  // format the date to mm/dd/yyyy
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US");
  }

  const clearScores = (e) => {
    e.preventDefault();

    // Clear the input fields
    setGameDate(gameDate);
    setNotes("Notes");
    setTotalScore(0);
    setTargetScore(0);
    setRoundNumber(1);
    resetScore();
    // alert("Added Target!");
  };

  const toggleSettings = (e) => {
    e.preventDefault();
    setShowSettings(!showSettings);
  };

  const saveNotes = (e) => {
    e.preventDefault();
    document.cookie = `notes=${notes}`;
    setIsEdit(false);
  };

  const saveName = (e) => {
    e.preventDefault();
    document.cookie = `round=${roundName}`;
    setReplaceName(false);
  };

  const addRound = (e) => {
    e.preventDefault();
    //  Ensure there's a game_id before adding rounds
    //   if (newGameId) {

    // Calculate the total score for the current round
    const newRoundScore = 0;
    // Create a new array of round scores with the current total score
    const newRoundScores = [...roundScores, newRoundScore];
    console.log("NEW ROUND SCORES: ", newRoundScores); // confirmed

    const sumRoundScores = newRoundScores.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );

    console.log("Sum of round scores:", sumRoundScores);
    setTotalRoundScores(sumRoundScores);

    // Increment the round header
    const newRoundHeader = roundHeaders.length + 1;

    const roundData = {
      game_id: newGameId,
      round_number: roundNumber,
    };
    console.log("ROUND DATA IS: ", roundData); // remove after confirmation
    const roundScoreData = {
      round_id: roundId,
      round_score: newRoundScore,
    };
    console.log("ROUND SCORE DATA IS: ", roundScoreData); // remove after confirmation

    dispatch({ type: "ADD_ROUND", payload: roundData });
    dispatch({ type: "ADD_ROUND_SCORE", payload: roundScoreData }); // check roundScoreData

    setRoundNumber(roundNumber + 1);
    console.log("ROUND NUMBER IS: ", roundNumber); // remove after confirmation

    setRoundScores(newRoundScores);
    setRoundHeaders([...roundHeaders, newRoundHeader]);
    setTargetScore(targetScore + 25);
    // setTotalScore(0);
  };

  const addGame = () => {
    const newGame = {
      game_date: formatDate(gameDate),
      game_notes: gameNotes,
      target_name: targetName,
      target_score_value: targetScore, // what is this representing??? -- decide later
      total_game_score: totalRoundScores, // this is representing the total score of all the rounds for the game
    };

    // Dispatch the action with the new target data
    dispatch({ type: "ADD_GAME", payload: newGame });

    // Clear the input fields
    setGameDate(gameDate);
    setGameNotes("Notes");
    setTotalScore(0);
    setTargetName("");
    setTargetScore(0);
    alert("Added Game!");
    history.push("/games");
  };

  const resetScore = () => {
    // Clear the cookies related to the score (e.g., hits)
    document.cookie = "hits=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

    // Reset the related state variables if needed
    setRoundScores([]);
    setRoundHeaders([]);
  };

  return (
    <>
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
      <div></div>
      <Card>
        <CardContent>
          <div className="game-header">
            {!replaceName ? (
              <div>
                <Typography variant="h6">{roundName}</Typography>
              </div>
            ) : (
              <input
                type="text"
                value={roundName}
                onChange={(e) => setRoundName(e.target.value)}
                onBlur={saveName}
              />
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={toggleSettings}
            >
              <MoreHorizIcon />
            </Button>
          </div>
          {showSettings ? (
            <div className="settings-div">
              <div className="round-edit">
                <Button
                  variant="outlined"
                  onClick={() => setReplaceName(!replaceName)}
                  style={{ fontSize: "10px" }}
                >
                  <EditIcon />
                  Edit
                </Button>
                <br />
              </div>
              <div className="round-table">
                <Table sx={{ minWidth: 250 }} size="small">
                  <TableHead>
                    <TableRow sx={{ "&:last-child th": { border: 0 } }}>
                      {roundHeaders.map((header) => (
                        <StyledTableCell
                          key={header}
                          style={{ textAlign: "center" }}
                        >
                          Round {header}
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      {roundScores.map((score, index) => (
                        <td key={index} className="score">
                          {score}
                        </td>
                      ))}
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </div>
              <div style={{ textAlign: "right", fontSize: "12px" }}>
                <p>Hits: </p>
                <p style={{ fontWeight: "bold" }}>Total: points</p>
                <Button onClick={clearScores} style={{ color: "red" }}>
                  <ClearAllIcon /> Clear
                </Button>
              </div>
            </div>
          ) : (
            <>
              {isEdit ? (
                // Render an input field in edit mode
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  onBlur={saveNotes}
                />
              ) : (
                // Render the round title
                <>
                  {/* <GameTimer /> gameId={game_id} */}
                  <Typography
                    variant="h7"
                    onClick={() => {
                      setIsEdit(!isEdit);
                    }}
                  >
                    {notes}
                  </Typography>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>
      <FormControl className="form-control" fullWidth>
        <Button
          variant="contained"
          onClick={addRound} // Make sure the button adds a round
        >
          Add Round
        </Button>
      </FormControl>
    </>
  );
}
