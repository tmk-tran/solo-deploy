import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import GameTimer from "../GameTimer/GameTimer"; // timer keeps resetting, figure out issue
import { useDispatch } from "react-redux";
// ~~~~~~~~~~~~~~~ Style ~~~~~~~~~~~~~~~~~~
import { Card, CardContent } from "@mui/material";
import "./ThreeRing.css";
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
} from "../Utils/helpers";
import {
  handleOuterClick,
  handleInnerClick,
  handleBullClick,
  handleToggleSettings,
  handleSaveNotes,
  handleSaveName,
} from "../Utils/targetZones";
import { savedAlert } from "../Utils/sweetAlerts";
// ~~~~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~
import GameHeader from "../GameHeader/GameHeader";
import GameInfo from "../GameInfo/GameInfo";
import GameMenu from "../GameMenu/GameMenu";
import RoundTable from "../RoundTable/RoundTable";
import ThreeRingTarget from "../ThreeRingTarget/ThreeRingTarget";
import AddRoundButton from "../AddRoundButton/AddRoundButton";
import TopButtonsGame from "../TopButtonsGame/TopButtonsGame";
import ThreeRingPoints from "../ThreeRingPoints/ThreeRingPoints";
import GameNotes from "../GameNotes/GameNotes";
import RoundEdit from "../RoundEdit/RoundEdit";

export default function ThreeRing() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Hooks
  const roundId = useRoundId();
  const newGameId = useGameId();

  const [pointsOuter, setPointsOuter] = useState(getCookie("outer") || 0);
  const [pointsInner, setPointsInner] = useState(getCookie("inner") || 0);
  const [bulls, setBulls] = useState(getCookie("bulls") || 0);
  const [showSettings, setShowSettings] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [replaceName, setReplaceName] = useState(false);
  // State to manage round scores and round headers
  const [roundScores, setRoundScores] = useState([]); // Array to store round scores
  const [roundHeaders, setRoundHeaders] = useState([]); // Array to store round headers
  const [totalRoundScores, setTotalRoundScores] = useState(0);
  // State to manage round numbers
  const [roundNumber, setRoundNumber] = useState(1);
  // From Games ~~~~~~~~~~~~~~~~~~~~~~~~~
  const [totalScore, setTotalScore] = useState(
    pointsOuter + pointsInner + bulls
  );
  const [gameDate, setGameDate] = useState(new Date()); // Initialize with the current date
  // console.log("GAME DATE IS:", gameDate);
  const [gameNotes, setGameNotes] = useState(getCookie("notes") || "Notes");
  const [targetName, setTargetName] = useState("3-Ring");
  const [targetScore, setTargetScore] = useState(0);

  useEffect(() => {
    // Calculate the total score whenever any of the individual scores change
    const totalScore =
      Number(pointsOuter) + Number(pointsInner) + Number(bulls);

    // Update the total score in the component state
    setTotalScore(totalScore);
  }, [pointsOuter, pointsInner, bulls]);

  // Bring in Rounds ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  console.log("Round ID = ", roundId);
  // Bring in Games ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  console.log("New Game ID:", newGameId);

  // Utils / Outer Zone ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const clickOuter = handleOuterClick(pointsOuter, setPointsOuter);

  // Utils / Inner Zone ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const clickInner = handleInnerClick(pointsInner, setPointsInner);

  // Utils / Bulls ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const clickBull = handleBullClick(bulls, setBulls);

  // Utils / Settings ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const toggleSettings = handleToggleSettings(showSettings, setShowSettings);

  // Utils / Notes
  const saveNotes = handleSaveNotes(gameNotes, setIsEdit);

  // Utils / Round Name ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const saveName = handleSaveName(targetName, setReplaceName);

  // Utils / Add Round ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const addRound = handleAddRound(
    pointsOuter,
    pointsInner,
    bulls,
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
    setPointsOuter,
    setPointsInner,
    setBulls,
    setTotalScore
  );

  const resetScore = () => {
    const cookiesToClear = ["outer", "inner", "bulls", "notes", "round"];
    const stateToReset = [ setPointsOuter, setPointsInner, setBulls, setTotalScore, setRoundScores, setRoundHeaders ]
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
    setPointsOuter,
    setPointsInner,
    setBulls,
    setTotalScore,
    setRoundNumber,
    resetScore
  );

  const targetOptions = [
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

                {/* Points for Three Ring Target */}
                <ThreeRingPoints
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
        <div className="game-menu">
          <GameInfo />
        </div>
        <div className="game-menu2">
          {" "}
          <GameMenu buttonLabel={buttonLabel} targetOptions={targetOptions} />
        </div>

        {/* Target */}
        <ThreeRingTarget
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