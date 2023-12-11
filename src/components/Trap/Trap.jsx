import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import GameTimer from "../GameTimer/GameTimer"; // timer keeps resetting, figure out issue
import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  CardContent,
  TextField,
  FormControl,
  Button,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import "./Trap.css";
// ~~~~~~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~
import getCookie from "../../hooks/cookie";
import useGameId from "../../hooks/gameId";
import useRoundId from "../../hooks/roundId";
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
  handleHit,
  handleToggleSettings,
  handleSaveNotes,
  handleSaveName,
} from "../Utils/targetZones";
import { savedAlert } from "../Utils/sweetAlerts";
// ~~~~~~~~~~~~~~~ Utils ~~~~~~~~~~~~~~~~~~
import { StyledTableCell, StyledTableRow } from "../Utils/helpers";

export default function Trap() {
  const dispatch = useDispatch();
  const history = useHistory();
  // ~~~~~~~~~~ Hooks ~~~~~~~~~~
  const newGameId = useGameId();
  const roundId = useRoundId();

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
  // from Games ~~~~~~~~~~~~~~~~~~~~~~~~~
  const [totalScore, setTotalScore] = useState(0); // change once named
  const [gameDate, setGameDate] = useState(new Date()); // Initialize with the current date
  console.log("GAME DATE IS:", gameDate);
  const [gameNotes, setGameNotes] = useState(getCookie("notes") || "Notes");
  const [targetName, setTargetName] = useState("Trap");
  const [targetScore, setTargetScore] = useState(0); // update this when we decide what it is for
  // State for Trap Round Scoring ~~~~~~~~~~~~~~~~~~~~~~~~~
  const [trapHit, setTrapHit] = useState(getCookie("hits") || 0);

  useEffect(() => {
    // Calculate the total score whenever any of the individual scores change
    const totalScore = Number(trapHit) + Number(totalRoundScores); // add something here

    // Update the total score in the component state
    setTotalScore(totalScore);
  }, [trapHit]);

  // Bring in Rounds
  console.log("Round ID = ", roundId);

  // Bring in Games
  console.log("New Game ID:", newGameId);

  // Utils / Recored Trap Hits ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const hit = handleHit(trapHit, setTrapHit);
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
  //   const newRoundScore = Number(trapHit);
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

  //   setRoundNumber(roundNumber + 1);
  //   console.log("ROUND NUMBER IS: ", roundNumber); // remove after confirmation

  //   setRoundScores(newRoundScores);
  //   setRoundHeaders([...roundHeaders, newRoundHeader]);
  //   setTrapHit(0);
  //   setTargetScore(targetScore + 25);
  //   // setTotalScore(0);
  // };
  // Utils / Add Round ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const addRound = handleAddRound(
    [trapHit],
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
      setTargetScore(targetScore + 25);
    },
    "Trap",
    setTrapHit,
    setTotalScore
  );
  // Utils / Reset ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const resetScore = () => {
    const cookiesToClear = ["hits", "notes", "round"];
    const stateToReset = [
      setTrapHit,
      setTotalScore,
      setRoundScores,
      setRoundHeaders,
    ];
    handleResetScore(cookiesToClear, ...stateToReset);
  };

  // Add Game ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const addGame = handleAddGame(
    newGameId,
    formatDate,
    gameDate,
    gameNotes,
    targetName,
    targetScore,
    totalRoundScores,
    savedAlert,
    dispatch,
    setGameDate,
    setGameNotes,
    setTotalScore,
    setTargetName,
    history,
    resetScore
  );

  // Clear Scores ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const clearScores = handleClearScores(
    gameDate,
    setGameDate,
    setGameNotes,
    setRoundNumber,
    resetScore,
    setTrapHit,
    setTotalScore,
    setTargetScore
  );

  // const perfectGame = () => {
  //   Swal.fire({
  //     title: "Perfect Score!",
  //     showClass: {
  //       popup: "animate__animated animate__fadeInDown",
  //     },
  //     hideClass: {
  //       popup: "animate__animated animate__fadeOutUp",
  //     },
  //     confirmButtonColor: "#1976D2",
  //   });
  // };

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
                    Edit Name
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
                  <p>Hits: {trapHit}</p>
                  <p style={{ fontWeight: "bold" }}>
                    Total: {targetScore} points
                  </p>
                  <Button onClick={clearScores} style={{ color: "red" }}>
                    <ClearAllIcon /> Clear
                  </Button>{" "}
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
      {/* <h1>Trap</h1> */}
      <Typography style={{ textAlign: "center" }}>
        <img
          src="/images/clay.png"
          alt="A set of trap clays"
          style={{ height: "100px", width: "100px" }}
        />
      </Typography>
      <Card className="trap-hit-card">
        <CardContent>
          <div className="trap-hit-display">
            <Typography
              variant="h5"
              style={{
                backgroundColor: "orange",
                borderRadius: "10px",
                padding: "10px",
                fontWeight: "bold",
              }}
            >
              25
            </Typography>
            <br />
            <Typography variant="h6">Hits: {trapHit}</Typography>
          </div>
          <div className="trap-hit-button">
            <Button variant="contained" onClick={hit}>
              <ModeStandbyIcon />
              Hit
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
