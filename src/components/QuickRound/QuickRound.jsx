import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import GameTimer from "../GameTimer/GameTimer"; // timer keeps resetting, figure out issue
import { useDispatch, useSelector } from "react-redux";
// ~~~~~~~~~~~~~~~ Style ~~~~~~~~~~~~~~~~~~
import {
  Card,
  CardContent,
  TextField,
  FormControl,
  Button,
  ListItemText,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
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
// ~~~~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~
import TopButtonsGame from "../TopButtonsGame/TopButtonsGame";
import GameHeader from "../GameHeader/GameHeader";
import RoundEdit from "../RoundEdit/RoundEdit";
import RoundTable from "../RoundTable/RoundTable";
import ThreeRingPoints from "../ThreeRingPoints/ThreeRingPoints";
import GameNotes from "../GameNotes/GameNotes";
import GameInfo from "../GameInfo/GameInfo";
import GameMenu from "../GameMenu/GameMenu";
import QR_ScoreTable from "../QR_ScoreTable/QR_ScoreTable";
import AddRoundButton from "../AddRoundButton/AddRoundButton";
// ~~~~~~~~~~~~~~~ Utils ~~~~~~~~~~~~~~~~~~
import { StyledTableCell, StyledTableRow } from "../Utils/helpers";

export default function QuickRound() {
  const dispatch = useDispatch();
  const history = useHistory();
  // ~~~~~~~~~~ Hooks ~~~~~~~~~~
  const newGameId = useGameId();

  // ~~~~~~~~~~ State ~~~~~~~~~~
  const [showSettings, setShowSettings] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [replaceName, setReplaceName] = useState(false);
  // ~~~~~~~~~~ Round scores and round headers ~~~~~~~~~~
  const [roundScores, setRoundScores] = useState([]); // Array to store round scores
  const [roundHeaders, setRoundHeaders] = useState([1]); // Array to store round headers
  const [totalRoundScores, setTotalRoundScores] = useState(0);
  // ~~~~~~~~~~ Round numbers ~~~~~~~~~~
  const [roundNumber, setRoundNumber] = useState(1);
  // ~~~~~~~~~~ Game State ~~~~~~~~~~
  const [totalScore, setTotalScore] = useState(0);
  const [gameDate, setGameDate] = useState(new Date());
  const [gameNotes, setGameNotes] = useState(getCookie("notes") || "Notes");
  const [targetName, setTargetName] = useState("Quick Round");
  const [targetScore, setTargetScore] = useState(0); // for this component, we want to record total shots taken, too
  // ~~~~~~~~~~ Quick Round Scoring ~~~~~~~~~~
  const [hit, setHit] = useState(getCookie("hit_quick") || 0); // hit count for game
  const [hitDisplay, setHitDisplay] = useState(
    getCookie("hit_quick_display") || 0
  ); // hit count for display
  const [miss, setMiss] = useState(getCookie("miss_quick") || 0);

  useEffect(() => {
    // Calculate the total score whenever any of the individual scores change
    const totalScore = Number(hit) + Number(miss);

    // Update the total score in the component state
    setTotalScore(totalScore);
    setTargetScore(totalScore);
  }, [hit, miss]);

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
    setHitDisplay
  );

  // Utils / Reset ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const resetScore = () => {
    const cookiesToClear = ["hit_quick", "miss_quick", "notes", "round"];
    const stateToReset = [setRoundScores, setRoundHeaders];
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
    setHit,
    setMiss,
    setTargetScore
  );

  return (
    <div
      className="page-container"
      style={{ backgroundImage: "none", position: "relative", top: "10px" }}
    >
      {/* Top Buttons Control */}
      <TopButtonsGame
        resetScore={resetScore}
        addGame={addGame}
        newGameId={newGameId}
      />
      
      <div>
        <Card>
          <CardContent>
            {/* Game Header */}
            <GameHeader
              replaceName={replaceName}
              targetName={targetName}
              setTargetName={setTargetName}
              saveName={saveName}
              toggleSettings={toggleSettings}
            />

            {showSettings ? (
              <div className="settings-div">
                {/* Round Edit */}
                <RoundEdit
                  replaceName={replaceName}
                  setReplaceName={setReplaceName}
                />

                {/* Round Table */}
                <RoundTable
                  roundHeaders={roundHeaders}
                  roundScores={roundScores}
                />

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
              <GameNotes
                isEdit={isEdit}
                saveNotes={saveNotes}
                setGameNotes={setGameNotes}
                gameNotes={gameNotes}
                setIsEdit={setIsEdit}
              />
            )}
          </CardContent>
        </Card>
      </div>
      <h1>Quick Round</h1>
      <Card className="trap-hit-card">
        <CardContent>
          {/* <div className="round-display">
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
            <CustomizedTables addRound={addRound}/>
          </div> */}
          <QR_ScoreTable roundHeaders={roundHeaders} roundScores={roundScores}/>
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
      
      {/* Add Round Button */}
      <AddRoundButton addRound={addRound} />
    </div>
  );
}
