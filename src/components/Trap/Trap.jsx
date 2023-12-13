import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import GameTimer from "../GameTimer/GameTimer"; // timer keeps resetting, figure out issue
import { useDispatch } from "react-redux";
// ~~~~~~~~~~~~~~~ Style ~~~~~~~~~~~~~~~~~~
import { Card, CardContent, Typography } from "@mui/material";
import "./Trap.css";
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
  handleHit,
  handleToggleSettings,
  handleSaveNotes,
  handleSaveName,
} from "../Utils/targetZones";
import { useSharedState } from "../Utils/sharedState";
import { savedAlert } from "../Utils/sweetAlerts";
// ~~~~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~
import TopButtonsGame from "../TopButtonsGame/TopButtonsGame";
import GameHeader from "../GameHeader/GameHeader";
import RoundEdit from "../RoundEdit/RoundEdit";
import RoundTable from "../RoundTable/RoundTable";
import GameNotes from "../GameNotes/GameNotes";
import GameInfo from "../GameInfo/GameInfo";
import GameMenu from "../GameMenu/GameMenu";
import AddRoundButton from "../AddRoundButton/AddRoundButton";
import TrapHitTracker from "../TrapHitTracker/TrapHitTracker";
import TrapPoints from "../TrapPoints/TrapPoints";

export default function Trap() {
  const dispatch = useDispatch();
  const history = useHistory();
  // ~~~~~~~~~~ Hooks ~~~~~~~~~~
  const newGameId = useGameId();

  // ~~~~~~~~~~ State ~~~~~~~~~~
  const {
    showSettings,
    setShowSettings,
    isEdit,
    setIsEdit,
    replaceName,
    setReplaceName,
    roundScores,
    setRoundScores,
    roundHeaders,
    setRoundHeaders,
    totalRoundScores,
    setTotalRoundScores,
    roundNumber,
    setRoundNumber,
    gameDate,
    setGameDate,
    gameNotes,
    setGameNotes,
    targetName,
    setTargetName,
    targetScore,
    setTargetScore,
  } = useSharedState("Trap");
  // ~~~~~~~~~~ Game State ~~~~~~~~~~
  const [totalScore, setTotalScore] = useState(0);
  //  ~~~~~~~~~~ Trap Round Scoring  ~~~~~~~~~~
  const [trapHit, setTrapHit] = useState(getCookie("hits") || 0);

  useEffect(() => {
    // Calculate the total score whenever any of the individual scores change
    const totalScore = Number(trapHit) + Number(totalRoundScores); // add something here

    // Update the total score in the component state
    setTotalScore(totalScore);
  }, [trapHit]);

  // Utils / Recorded Trap Hits ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const hit = handleHit(trapHit, setTrapHit);
  // Utils / Settings ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const toggleSettings = handleToggleSettings(showSettings, setShowSettings);
  // Utils / Notes  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const saveNotes = handleSaveNotes(gameNotes, setIsEdit);
  // Utils / Round Name ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const saveName = handleSaveName(targetName, setReplaceName);

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

                {/* Points for Trap game mode */}
                <TrapPoints
                  trapHit={trapHit}
                  targetScore={targetScore}
                  clearScores={clearScores}
                />
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
      {/* <h1>Trap</h1> */}
      <Typography style={{ textAlign: "center" }}>
        <img
          src="/images/clay.png"
          alt="A set of trap clays"
          style={{ height: "100px", width: "100px" }}
        />
      </Typography>
      {/* Record Trap Hits */}
      <TrapHitTracker trapHit={trapHit} hit={hit} />
      {/* Add Round Button */}
      <AddRoundButton addRound={addRound} />
    </div>
  );
}
