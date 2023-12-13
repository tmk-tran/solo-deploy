import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import GameTimer from "../GameTimer/GameTimer"; // timer keeps resetting, figure out issue
import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  CardContent,
  TextField,
  FormControl,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
// ~~~~~~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~
import getCookie from "../../hooks/cookie";
import useGameId from "../../hooks/gameId";
import Swal from "sweetalert2";
// ~~~~~~~~~~~~~~~ Utils ~~~~~~~~~~~~~~~~~~
import {
  formatDate,
  buttonLabel,
  handleAddRound,
  handleAddGame,
  handleClearScores,
  handleResetScore,
  formatTargets,
} from "../Utils/helpers";
import {
  handleTargetHit,
  handleTargetMiss,
  handleToggleSettings,
  handleSaveNotes,
  handleSaveName,
} from "../Utils/targetZones";
import { savedAlert } from "../Utils/sweetAlerts";
// ~~~~~~~~~~~~~~~ Utils ~~~~~~~~~~~~~~~~~~
import { StyledTableCell, StyledTableRow } from "../Utils/helpers";

export default function QuickRound() {
  const dispatch = useDispatch();
  const history = useHistory();
  // ~~~~~~~~~~ Hooks ~~~~~~~~~~
  const newGameId = useGameId();

  const [showSettings, setShowSettings] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [replaceName, setReplaceName] = useState(false);
  // Define state to manage round scores and round headers
  const [roundScores, setRoundScores] = useState([]); // Array to store round scores
  const [roundHeaders, setRoundHeaders] = useState([1]); // Array to store round headers
  const [totalRoundScores, setTotalRoundScores] = useState(0);
  console.log("TOTAL SCORES OF ROUNDS = ", totalRoundScores);

  // State to manage round numbers
  const [roundNumber, setRoundNumber] = useState(1);
  // ~~~~~~~~~~ Game State ~~~~~~~~~~
  const [totalScore, setTotalScore] = useState(0);
  console.log(totalScore);
  const [gameDate, setGameDate] = useState(new Date()); // Initialize with the current date
  console.log("GAME DATE IS:", gameDate);
  const [gameNotes, setGameNotes] = useState(getCookie("notes") || "Notes");
  const [targetName, setTargetName] = useState("Quick Round");
  const [targetScore, setTargetScore] = useState(0); // for this component, we want to record total shots taken, too
  console.log("TARGET SCORE = ", targetScore);
  // State for Quick Round Scoring ~~~~~~~~~~~~~~~~~~~~~~~~~
  const [hit, setHit] = useState(getCookie("hit_quick") || 0); // hit count for game
  console.log("HIT COUNT = ", hit);
  const [hitDisplay, setHitDisplay] = useState(
    getCookie("hit_quick_display") || 0
  ); // hit count for display
  console.log("HIT DISPLAY = ", hitDisplay);
  const [miss, setMiss] = useState(getCookie("miss_quick") || 0);

  useEffect(() => {
    // Calculate the total score whenever any of the individual scores change
    const totalScore = Number(hit) + Number(miss);

    // Update the total score in the component state
    setTotalScore(totalScore);
  }, [hit, miss]);

  console.log("TOTAL SCORE = ", totalScore); 

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

  // Utils / Hits ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const targetHit = handleTargetHit(hit, setHit, hitDisplay, setHitDisplay);
  // Utils / Misses ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const targetMiss = handleTargetMiss(miss, setMiss);
  // Utils / Settings ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const toggleSettings = handleToggleSettings(showSettings, setShowSettings);
  // Utils / Notes  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const saveNotes = handleSaveNotes(gameNotes, setIsEdit);
  // Utils / Round Name ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const saveName = handleSaveName(targetName, setReplaceName);

  // const addRound = (e) => {
  //   e.preventDefault();
  //   //  Ensure there's a game_id before adding rounds
  //   //   if (newGameId) {

  //   // Calculate the total score for the current round
  //   const newRoundScore = Number(hitDisplay);
  //   // Create a new array of round scores with the current total score
  //   const newRoundScores = [...roundScores, newRoundScore];
  //   console.log("NEW ROUND SCORES: ", newRoundScores); // confirmed

  //   const sumRoundScores = newRoundScores.reduce(
  //     (accumulator, currentValue) => {
  //       return accumulator + currentValue;
  //     },
  //     0
  //   );

  //   console.log("Sum of round scores:", sumRoundScores);
  //   setTotalRoundScores(sumRoundScores);

  //   // Increment the round header
  //   const newRoundHeader = roundHeaders.length + 1;

  //   const roundData = {
  //     game_id: newGameId,
  //     round_number: roundNumber,
  //     round_score: newRoundScore,
  //   };
  //   console.log("ROUND DATA IS: ", roundData); // remove after confirmation

  //   dispatch({ type: "ADD_ROUND", payload: roundData });
  //   // dispatch({ type: "ADD_ROUND_SCORE", payload: roundScoreData }); // check roundScoreData

  //   setRoundNumber(roundNumber + 1);
  //   console.log("ROUND NUMBER IS: ", roundNumber); // remove after confirmation
  //   setRoundScores(newRoundScores);
  //   setRoundHeaders([...roundHeaders, newRoundHeader]);
  //   // setHit(0);
  //   setHitDisplay(0);
  //   setTargetScore(sumRoundScores);
  // };

  // // Utils / Add Round ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const addRound = handleAddRound(
    [hit, miss, hitDisplay],
    roundScores,
    totalScore,
    setRoundScores,
    roundHeaders,
    setRoundHeaders,
    setTotalRoundScores,
    roundNumber,
    setRoundNumber,
    newGameId,
    dispatch,
    () => {
      setTotalScore(hit + miss);
    },
    "QuickRound",
    // setHit,
    setHitDisplay,
    // setTotalScore,
  );

  const shotTotal = Number(hit + miss);
  console.log("SHOT TOTAL IS: ", shotTotal);

  // Utils / Reset ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const resetScore = () => {
    const cookiesToClear = ["hit_quick", "miss_quick", "notes", "round"];
    const stateToReset = [setRoundScores, setRoundHeaders];
    handleResetScore(cookiesToClear, ...stateToReset);
  };

  const addGame = () => {
    const newGame = {
      game_id: newGameId,
      game_date: formatDate(gameDate),
      game_notes: gameNotes,
      target_name: targetName,
      target_score_value: shotTotal, // the total shots taken by user
      total_game_score: totalRoundScores, // this is representing the total score of all the rounds for the game
    };

    savedAlert();
    // Dispatch the action with the new target data
    dispatch({ type: "EDIT_GAME", payload: newGame });

    // Clear counters
    setGameDate(gameDate);
    setGameNotes("Notes");
    setTargetName("");
    setTargetScore(0);
    history.push("/results");
    resetScore();
  };

  // Clear Scores ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const clearScores = handleClearScores(
    gameDate,
    setGameDate,
    setGameNotes,
    setRoundNumber,
    resetScore,
    setHit,
    setMiss,
    setTargetScore
  );

  return (
    <div
      className="page-container"
      style={{ backgroundImage: "none", position: "relative", top: "10px" }}
    >
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
      <div>
        <Card>
          <CardContent>
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
              <Button variant="contained" onClick={toggleSettings}>
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
                          <StyledTableCell key={header} className="header">
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
                  <p>Hits: {hit}</p>
                  <p style={{ fontWeight: "bold" }}>
                    Total: {targetScore} points
                  </p>
                  <Button onClick={clearScores} style={{ color: "red" }}>
                    <ClearAllIcon /> Clear
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {isEdit ? (
                  // Render an input field in edit mode
                  <TextField
                    type="text"
                    label="Game Notes"
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
            )}
          </CardContent>
        </Card>
      </div>
      <h1>Quick Round</h1>
      <Card className="trap-hit-card">
        <CardContent>
          <div className="round-display">
            <Table sx={{ minWidth: 250 }} size="small">
              <TableHead>
                <TableRow sx={{ "&:last-child th": { border: 1 } }}>
                  {roundHeaders.map((header) => (
                    <StyledTableCell key={header} className="header">
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
            {/* <CustomizedTables addRound={addRound}/> */}
          </div>
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
    </div>
  );
}
