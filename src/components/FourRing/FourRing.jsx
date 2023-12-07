import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import GameTimer from "../GameTimer/GameTimer"; // timer keeps resetting, figure out issue
import { useDispatch, useSelector } from "react-redux";
// ~~~~~~~~~~~~~~~ Style ~~~~~~~~~~~~~~~~~~
import { Card, CardContent } from "@mui/material";

import QueryStatsIcon from "@mui/icons-material/QueryStats";
import "./FourRing.css";
// ~~~~~~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~
import getCookie from "../../hooks/cookie";
import useRoundId from "../../hooks/roundId";
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
  handleFourthClick,
  handleOuterClick,
  handleInnerClick,
  handleBullClick,
  handleToggleSettings,
  handleSaveNotes,
  handleSaveName,
} from "../Utils/targetZones";
import { savedAlert } from "../Utils/sweetAlerts";
// ~~~~~~~~~~~~~~~ Components ~~~~~~~~~~~~~
import TopButtonsGame from "../TopButtonsGame/TopButtonsGame";
import GameHeader from "../GameHeader/GameHeader";
import RoundEdit from "../RoundEdit/RoundEdit";
import RoundTable from "../RoundTable/RoundTable";
import FourRingPoints from "../FourRingPoints/FourRingPoints";
import GameNotes from "../GameNotes/GameNotes";
import GameInfo from "../GameInfo/GameInfo";
import GameMenu from "../GameMenu/GameMenu";
import FourRingTarget from "../FourRingTarget/FourRingTarget";
import AddRoundButton from "../AddRoundButton/AddRoundButton";

export default function FourRing() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Hooks
  const roundId = useRoundId();
  const newGameId = useGameId();

  // ~~~~~~~~~~ Fourth Ring State ~~~~~~~~~~
  const [pointsFourth, setPointsFourth] = useState(getCookie("fourth") || 0);
  // ~~~~~~~~~~ Inner 3 Ring State ~~~~~~~~~~
  const [pointsOuter, setPointsOuter] = useState(getCookie("outer") || 0);
  const [pointsInner, setPointsInner] = useState(getCookie("inner") || 0);
  const [bulls, setBulls] = useState(getCookie("bulls") || 0);
  const [showSettings, setShowSettings] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [replaceName, setReplaceName] = useState(false);
  // Round scores and round headers
  const [roundScores, setRoundScores] = useState([]); // Array to store round scores
  const [roundHeaders, setRoundHeaders] = useState([1]); // Array to store round headers
  const [totalRoundScores, setTotalRoundScores] = useState(0);
  console.log("TOTAL SCORES OF ROUNDS = ", totalRoundScores);

  // Round numbers
  const [roundNumber, setRoundNumber] = useState(1);

  // Game State ~~~~~~~~~~~~~~~~~~~~~~~~~
  const [totalScore, setTotalScore] = useState(
    pointsFourth + pointsOuter + pointsInner + bulls
  );
  const [gameDate, setGameDate] = useState(new Date()); // Initialize with the current date
  console.log("GAME DATE IS:", gameDate);
  const [gameNotes, setGameNotes] = useState(getCookie("notes") || "Notes");
  const [targetName, setTargetName] = useState("4-Ring");
  const [targetScore, setTargetScore] = useState(0); // update this when we decide what it is for

  useEffect(() => {
    // Calculate the total score whenever any of the individual scores change
    const totalScore =
      Number(pointsFourth) +
      Number(pointsOuter) +
      Number(pointsInner) +
      Number(bulls);

    // Update the total score in the component state
    setTotalScore(totalScore);
  }, [pointsFourth, pointsOuter, pointsInner, bulls]);

  // Utils / Fourth Ring ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const clickFourth = handleFourthClick(pointsFourth, setPointsFourth);
  // Utils / Outer Zone ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const clickOuter = handleOuterClick(pointsOuter, setPointsOuter);

  // Utils / Inner Zone ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const clickInner = handleInnerClick(pointsInner, setPointsInner);

  // Utils / Bulls ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const clickBull = handleBullClick(bulls, setBulls);

  // Utils / Settings ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const toggleSettings = handleToggleSettings(showSettings, setShowSettings);

  // Utils / Notes  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const saveNotes = handleSaveNotes(gameNotes, setIsEdit);

  // Utils / Round Name ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const saveName = handleSaveName(targetName, setReplaceName);

  const addRound = (e) => {
    e.preventDefault();
    //  Ensure there's a game_id before adding rounds
    //   if (newGameId) {

    // Calculate the total score for the current round
    const newRoundScore =
      Number(pointsOuter) + Number(pointsInner) + Number(bulls);
    // Create a new array of round scores with the current total score
    const newRoundScores = [...roundScores, totalScore];
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
      round_score: newRoundScore,
    };
    console.log("ROUND DATA IS: ", roundData); // remove after confirmation

    dispatch({ type: "ADD_ROUND", payload: roundData });

    setRoundNumber(roundNumber + 1);
    console.log("ROUND NUMBER IS: ", roundNumber); // remove after confirmation

    setRoundScores(newRoundScores);
    setRoundHeaders([...roundHeaders, newRoundHeader]);
    setPointsFourth(0);
    setPointsOuter(0);
    setPointsInner(0);
    setBulls(0);
    setTotalScore(0);
  };

  const addGame = () => {
    const gameData = {
      game_id: newGameId,
      game_date: formatDate(gameDate),
      game_notes: gameNotes,
      target_name: targetName,
      target_score_value: targetScore, // what is this representing??? -- decide later
      total_game_score: totalRoundScores, // this is representing the total score of all the rounds for the game
    };

    savedAlert();
    // Dispatch the action with the new target data
    dispatch({ type: "EDIT_GAME", payload: gameData });

    // Clear the input fields
    setGameDate(gameDate);
    setGameNotes("Notes");
    setTotalScore(0);
    setTargetName("");
    history.push("/results");
    resetScore();
  };

  const resetScore = () => {
    // Clear the cookies related to the score
    document.cookie = "fourth=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "outer=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "inner=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "bulls=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "notes=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "round=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

    setPointsFourth(0);
    setPointsOuter(0);
    setPointsInner(0);
    setBulls(0);
    setTotalScore(0);
    setRoundScores([]);
    setRoundHeaders([]);
  };

  // Clear Scores ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const clearScores = handleClearScores(
    gameDate,
    setGameDate,
    setGameNotes,
    setRoundNumber,
    resetScore,
    setPointsFourth,
    setPointsOuter,
    setPointsInner,
    setBulls,
    setTotalScore
  );

  const buttonLabel = <QueryStatsIcon />;
  const targetOptions = [
    `7's: ${pointsFourth}`,
    `8's: ${pointsOuter}`,
    `9's: ${pointsInner}`,
    `10's: ${bulls}`,
    `Total = ${totalScore}`,
  ];

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

                {/* Points for Four Ring Target */}
                <FourRingPoints
                  pointsFourth={pointsFourth}
                  pointsOuter={pointsOuter}
                  pointsInner={pointsInner}
                  bulls={bulls}
                  totalScore={totalScore}
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
      <div className="container">
        {/* Game Info Menu */}
        <GameInfo />

        {/* Game Points Menu */}
        <GameMenu buttonLabel={buttonLabel} targetOptions={targetOptions} />

        {/* Target */}
        <FourRingTarget
          clickFourth={clickFourth}
          clickOuter={clickOuter}
          clickInner={clickInner}
          clickBull={clickBull}
        />
      </div>

      {/* Add Round Button */}
      <AddRoundButton addRound={addRound} />
    </div>
  );
}
