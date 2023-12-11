import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import GameTimer from "../GameTimer/GameTimer"; // timer keeps resetting, figure out issue
import { useDispatch, useSelector } from "react-redux";
import "./Bulls.css";
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
import ClearAllIcon from "@mui/icons-material/ClearAll";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
// ~~~~~~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~
import getCookie from "../../hooks/cookie";
import useGameId from "../../hooks/gameId";
import Swal from "sweetalert2";
// ~~~~~~~~~~~~~~~ Utils ~~~~~~~~~~~~~~~~~~
import { StyledTableCell, StyledTableRow } from "../Utils/helpers";
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
  handleBullClick,
  handleToggleSettings,
  handleSaveNotes,
  handleSaveName,
} from "../Utils/targetZones";
import { savedAlert } from "../Utils/sweetAlerts";
// ~~~~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~
import GameInfo from "../GameInfo/GameInfo";
import GameMenu from "../GameMenu/GameMenu";

export default function Bulls() {
  const dispatch = useDispatch();
  const history = useHistory();
  // ~~~~~~~~~~ Hooks ~~~~~~~~~~
  const newGameId = useGameId();
  // ~~~~~~~~~~ State ~~~~~~~~~~
  const [pointsOuter, setPointsOuter] = useState(getCookie("outer") || 0);
  const [pointsInner, setPointsInner] = useState(getCookie("inner") || 0);
  const [bulls, setBulls] = useState(getCookie("bulls") || 0);
  const [showSettings, setShowSettings] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [replaceName, setReplaceName] = useState(false);
  // ~~~~~~~~~~ Round scores and round headers ~~~~~~~~~~
  const [roundScores, setRoundScores] = useState([]); // Array to store round scores
  const [roundHeaders, setRoundHeaders] = useState([]); // Array to store round headers
  const [totalRoundScores, setTotalRoundScores] = useState(0);
  // console.log("TOTAL SCORES OF ROUNDS = ", totalRoundScores);

  // ~~~~~~~~~~ Round numbers ~~~~~~~~~~
  const [roundNumber, setRoundNumber] = useState(1);

  // ~~~~~~~~~~ Game State ~~~~~~~~~~
  const [totalScore, setTotalScore] = useState(
    pointsOuter + pointsInner + bulls
  );
  const [gameDate, setGameDate] = useState(new Date()); // Initialize with the current date
  // console.log("GAME DATE IS:", gameDate);
  const [gameNotes, setGameNotes] = useState(getCookie("notes") || "Notes");
  const [targetName, setTargetName] = useState("Bullseyes Only");
  const [targetScore, setTargetScore] = useState(0); // update this when we decide what it is for

  useEffect(() => {
    // Calculate the total score whenever any of the individual scores change
    const totalScore =
      Number(pointsOuter) + Number(pointsInner) + Number(bulls);

    // Update the total score in the component state
    setTotalScore(totalScore);
  }, [pointsOuter, pointsInner, bulls]);

  // Bring in Rounds
  const rounds = useSelector((store) => store.roundReducer);
  console.log("ROUNDS store in ThreeRing: ", rounds);
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

  console.log("New Game ID:", newGameId);

  // const clearScores = (e) => {
  //   e.preventDefault();

  //   // Clear the input fields
  //   setGameDate(gameDate);
  //   setGameNotes("Notes");
  //   setPointsOuter(0);
  //   setPointsInner(0);
  //   setBulls(0);
  //   setTotalScore(0);
  //   setRoundNumber(1);
  //   resetScore();
  //   // alert("Added Target!");
  // };

  // Utils / Bulls ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const clickBull = handleBullClick(bulls, setBulls);
  // Utils / Settings ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const toggleSettings = handleToggleSettings(showSettings, setShowSettings);
  // Utils / Notes  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const saveNotes = handleSaveNotes(gameNotes, setIsEdit);
  // Utils / Round Name ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const saveName = handleSaveName(targetName, setReplaceName);

  // Utils / Add Round ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const addRound = handleAddRound(
    [bulls],
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
      setTotalScore(bulls);
    },
    "Bulls",
    setBulls,
    setTotalScore
  );

  // Utils / Reset ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const resetScore = () => {
    const cookiesToClear = ["bulls", "notes", "round"];
    const stateToReset = [
      setBulls,
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
    setBulls,
    setTotalScore
  );

  const targets = [{ label: "Bulls", points: bulls }];
  const targetOptions = formatTargets(targets);

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
                  <p>Bull's: {bulls}</p>
                  <p style={{ fontWeight: "bold" }}>
                    Total: {totalScore} points
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
      <div className="container">
        <div className="game-menu">
          <GameInfo />
        </div>
        <div className="game-menu2">
          {" "}
          <GameMenu buttonLabel={buttonLabel} targetOptions={targetOptions} />
        </div>
        <div className="bulls-ring">
          <div className="bulls-ring-inner">
            <div className="bulls" onClick={clickBull}></div>
          </div>
        </div>
      </div>
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
