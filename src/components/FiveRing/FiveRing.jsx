import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import GameTimer from "../GameTimer/GameTimer"; // timer keeps resetting, figure out issue
import { useDispatch } from "react-redux";
// ~~~~~~~~ Style ~~~~~~~~
import { Card, CardContent } from "@mui/material";
import "./FiveRing.css";
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
  handleFifthClick,
  handleFourthClick,
  handleOuterClick,
  handleInnerClick,
  handleBullClick,
  handleToggleSettings,
  handleSaveNotes,
  handleSaveName,
} from "../Utils/targetZones";
import { useSharedState } from "../Utils/sharedState";
import { savedAlert } from "../Utils/sweetAlerts";
// ~~~~~~~~~~~~~~~ Components ~~~~~~~~~~~~~
import TopButtonsGame from "../TopButtonsGame/TopButtonsGame";
import GameHeader from "../GameHeader/GameHeader";
import RoundEdit from "../RoundEdit/RoundEdit";
import RoundTable from "../RoundTable/RoundTable";
import FiveRingPoints from "../FiveRingPoints/FiveRingPoints";
import GameNotes from "../GameNotes/GameNotes";
import GameInfo from "../GameInfo/GameInfo";
import GameMenu from "../GameMenu/GameMenu";
import FiveRingTarget from "../FiveRingTarget/FiveRingTarget";
import AddRoundButton from "../AddRoundButton/AddRoundButton";

export default function FourRing() {
  const dispatch = useDispatch();
  const history = useHistory();
  // ~~~~~~~~~~ Hooks ~~~~~~~~~~
  const newGameId = useGameId();

  // ~~~~~~~~~~ Fifth Ring State ~~~~~~~~~~
  const [pointsFifth, setPointsFifth] = useState(getCookie("fifth") || 0);
  // ~~~~~~~~~~ Fourth Ring State ~~~~~~~~~~
  const [pointsFourth, setPointsFourth] = useState(getCookie("fourth") || 0);
  // ~~~~~~~~~~ State ~~~~~~~~~~
  const {
    pointsOuter,
    setPointsOuter,
    pointsInner,
    setPointsInner,
    bulls,
    setBulls,
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
  } = useSharedState("5-Ring");
  // ~~~~~~~~~~ Game State ~~~~~~~~~~
  const [totalScore, setTotalScore] = useState(
    pointsFifth + pointsFourth + pointsOuter + pointsInner + bulls
  );

  useEffect(() => {
    // Calculate the total score whenever any of the individual scores change
    const gameScore =
      Number(pointsFifth) +
      Number(pointsFourth) +
      Number(pointsOuter) +
      Number(pointsInner) +
      Number(bulls);

    // Update the total score in the component state
    setTotalScore(gameScore);
  }, [pointsFifth, pointsFourth, pointsOuter, pointsInner, bulls]);

  // Utils / Fifth Ring ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const clickFifth = handleFifthClick(pointsFifth, setPointsFifth);
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

  // Utils / Add Round ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const addRound = handleAddRound(
    [pointsFifth, pointsFourth, pointsOuter, pointsInner, bulls],
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
      setTotalScore(
        pointsFifth + pointsFourth + pointsOuter + pointsInner + bulls
      );
    },
    "FiveRing",
    setPointsFifth,
    setPointsFourth,
    setPointsOuter,
    setPointsInner,
    setBulls,
    setTotalScore
  );

  // Utils / Reset ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const resetScore = () => {
    const cookiesToClear = [
      "fifth",
      "fourth",
      "outer",
      "inner",
      "bulls",
      "notes",
      "round",
    ];
    const stateToReset = [
      setPointsFifth,
      setPointsFourth,
      setPointsOuter,
      setPointsInner,
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
    setPointsFourth,
    setPointsOuter,
    setPointsInner,
    setBulls,
    setTotalScore
  );

  // Target Point Assignment ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const targets = [
    { label: "6's", points: pointsFifth },
    { label: "7's", points: pointsFourth },
    { label: "8's", points: pointsOuter },
    { label: "9's", points: pointsInner },
    { label: "10's", points: bulls },
    { label: "Total", points: totalScore },
  ];

  const targetOptions = formatTargets(targets);

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

                {/* Points for Five Ring Target */}
                <FiveRingPoints
                  pointsFifth={pointsFifth}
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
        <FiveRingTarget
          clickFifth={clickFifth}
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
