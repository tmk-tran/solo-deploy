import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import GameTimer from "../GameTimer/GameTimer"; // timer keeps resetting, figure out issue
import { useDispatch, useSelector } from "react-redux";

import { Card, CardContent } from "@mui/material";
// ~~~~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~
import RoundTable from "../RoundTable/RoundTable";
import TopButtonsGame from "../TopButtonsGame/TopButtonsGame";
import GameHeader from "../GameHeader/GameHeader";
import RoundEdit from "../RoundEdit/RoundEdit";
import ThreeRingPoints from "../ThreeRingPoints/ThreeRingPoints";
import GameNotes from "../GameNotes/GameNotes";
import AddRoundButton from "../AddRoundButton/AddRoundButton";
// ~~~~~~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~
import getCookie from "../../hooks/cookie";
import useGameId from "../../hooks/gameId";
import useRoundId from "../../hooks/roundId";
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
  handleToggleSettings,
  handleSaveNotes,
  handleSaveName,
} from "../Utils/targetZones";
import { savedAlert } from "../Utils/sweetAlerts";

export default function RoundTracker({
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
  // ~~~~~~~~~~ Hooks ~~~~~~~~~~
  const newGameId = useGameId();
  const roundId = useRoundId();
  console.log("Round ID = ", roundId);

  // // Bring in Games
  console.log("New Game ID:", newGameId);

  // Utils / Settings ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const toggleSettings = handleToggleSettings(showSettings, setShowSettings);
  // Utils / Notes  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const saveNotes = handleSaveNotes(gameNotes, setIsEdit);
  // Utils / Round Name ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const saveName = handleSaveName(targetName, setReplaceName);

  const resetScore = () => {
    // Clear the cookies related to the score (e.g., hits)
    document.cookie = "hits=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

    // Reset the related state variables if needed
    setRoundScores([]);
    setRoundHeaders([]);
  };

  // const addRound = (e) => {
  //   e.preventDefault();
  //   //  Ensure there's a game_id before adding rounds
  //   //   if (newGameId) {

  //   // Calculate the total score for the current round
  //   const newRoundScore = 0;
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
  //   };
  //   console.log("ROUND DATA IS: ", roundData); // remove after confirmation
  //   const roundScoreData = {
  //     round_id: roundId,
  //     round_score: newRoundScore,
  //   };
  //   console.log("ROUND SCORE DATA IS: ", roundScoreData); // remove after confirmation

  //   dispatch({ type: "ADD_ROUND", payload: roundData });
  //   dispatch({ type: "ADD_ROUND_SCORE", payload: roundScoreData }); // check roundScoreData

  //   setRoundNumber(roundNumber + 1);
  //   console.log("ROUND NUMBER IS: ", roundNumber); // remove after confirmation

  //   setRoundScores(newRoundScores);
  //   setRoundHeaders([...roundHeaders, newRoundHeader]);
  //   setTargetScore(targetScore + 25);
  //   // setTotalScore(0);
  // };
  // Utils / Add Round ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const addRound = handleAddRound(
    [],
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
    setTotalScore
  );

  // const addGame = () => {
  //   const newGame = {
  //     game_date: formatDate(gameDate),
  //     game_notes: gameNotes,
  //     target_name: targetName,
  //     target_score_value: targetScore, // what is this representing??? -- decide later
  //     total_game_score: totalRoundScores, // this is representing the total score of all the rounds for the game
  //   };

  //   // Dispatch the action with the new target data
  //   dispatch({ type: "ADD_GAME", payload: newGame });

  //   // Clear the input fields
  //   setGameDate(gameDate);
  //   setGameNotes("Notes");
  //   setTotalScore(0);
  //   setTargetName("");
  //   setTargetScore(0);
  //   alert("Added Game!");
  //   history.push("/games");
  // };

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

  return (
    <>
      <TopButtonsGame
        resetScore={resetScore}
        addGame={addGame}
        newGameId={newGameId}
      />
      <div></div>
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

              {/* Points for Three Ring Target */}
              {/* <ThreeRingPoints
                pointsOuter={pointsOuter}
                pointsInner={pointsInner}
                bulls={bulls}
                totalScore={totalScore}
                clearScores={clearScores}
              /> */}
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
      <AddRoundButton addRound={addRound} />
    </>
  );
}
