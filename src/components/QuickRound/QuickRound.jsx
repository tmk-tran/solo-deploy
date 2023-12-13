import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import GameTimer from "../GameTimer/GameTimer"; // timer keeps resetting, figure out issue
import { useDispatch } from "react-redux";
// ~~~~~~~~~~~~~~~ Style ~~~~~~~~~~~~~~~~~~
import { Card, CardContent } from "@mui/material";
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
import { useSharedState } from "../Utils/sharedState";
import { savedAlert } from "../Utils/sweetAlerts";
// ~~~~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~
import TopButtonsGame from "../TopButtonsGame/TopButtonsGame";
import GameHeader from "../GameHeader/GameHeader";
import RoundEdit from "../RoundEdit/RoundEdit";
import RoundTable from "../RoundTable/RoundTable";
import QR_Points from "../QR_Points/QR_Points";
import GameNotes from "../GameNotes/GameNotes";
import GameInfo from "../GameInfo/GameInfo";
import GameMenu from "../GameMenu/GameMenu";
import QR_ScoreTable from "../QR_ScoreTable/QR_ScoreTable";
import QR_Display from "../QR_Display/QR_Display";
import AddRoundButton from "../AddRoundButton/AddRoundButton";

export default function QuickRound() {
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
  } = useSharedState("Quick Round"); 
  // ~~~~~~~~~~ Game State ~~~~~~~~~~
  const [totalScore, setTotalScore] = useState(0);

  // ~~~~~~~~~~ Quick Round Scoring ~~~~~~~~~~
  const [hit, setHit] = useState(getCookie("hit_quick") || 0); // hit count for game
  const [hitDisplay, setHitDisplay] = useState(
    getCookie("hit_quick_display") || 0
  ); // hit count for display
  const [miss, setMiss] = useState(getCookie("miss_quick") || 0);

  useEffect(() => {
    // Calculate the total score whenever any of the individual scores change
    const gameScore = Number(hit) + Number(miss);

    // Update the total score in the component state
    setTotalScore(gameScore);
    setTargetScore(gameScore);
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

                {/* Points for QuickRound */}
                <QR_Points
                  hit={hit}
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
      <h1>Quick Round</h1>
      <Card className="trap-hit-card">
        <CardContent>
          {/* Round Score Display */}
          <QR_ScoreTable
            roundHeaders={roundHeaders}
            roundScores={roundScores}
          />
          {/* Score Display | Hit/Miss Buttons */}
          <QR_Display
            hit={hit}
            miss={miss}
            targetHit={targetHit}
            targetMiss={targetMiss}
          />
        </CardContent>
      </Card>

      {/* Add Round Button */}
      <AddRoundButton addRound={addRound} />
    </div>
  );
}
