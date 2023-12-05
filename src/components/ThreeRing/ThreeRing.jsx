import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import GameTimer from "../GameTimer/GameTimer"; // timer keeps resetting, figure out issue
import { useDispatch } from "react-redux";
import "./ThreeRing.css";
import { Card, CardContent } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
// ~~~~~~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~
import getCookie from "../../hooks/cookie";
import useRoundId from "../../hooks/roundId";
import useGameId from "../../hooks/gameId";
// import Swal from "sweetalert2";
// ~~~~~~~~~~~~~~~ Utils ~~~~~~~~~~~~~~~~~~
import { formatDate, buttonLabel } from "../Utils/helpers";
import {
  handleOuterClick,
  handleInnerClick,
  handleBullClick,
  handleToggleSettings,
  handleSaveNotes,
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
  const [targetScore, setTargetScore] = useState(0); // update this when we decide what it is for

  useEffect(() => {
    // Calculate the total score whenever any of the individual scores change
    const totalScore =
      Number(pointsOuter) + Number(pointsInner) + Number(bulls);

    // Update the total score in the component state
    setTotalScore(totalScore);
  }, [pointsOuter, pointsInner, bulls]);

  // Bring in Rounds
  console.log("Round ID = ", roundId);

  // Bring in Games
  console.log("New Game ID:", newGameId);

  const clearScores = (e) => {
    e.preventDefault();

    // Clear the input fields
    setGameDate(gameDate);
    setGameNotes("Notes");
    setPointsOuter(0);
    setPointsInner(0);
    setBulls(0);
    setTotalScore(0);
    setRoundNumber(1);
    resetScore();
    // alert("Added Target!");
  };

  // Utils / Outer Zone
  const clickOuter = handleOuterClick(pointsOuter, setPointsOuter);

  // Utils / Inner Zone
  const clickInner = handleInnerClick(pointsInner, setPointsInner);

  // Utils / Bulls
  const clickBull = handleBullClick(bulls, setBulls);

  // Utils / Settings
  const toggleSettings = handleToggleSettings(showSettings, setShowSettings);

  // const saveNotes = (e) => {
  //   e.preventDefault();
  //   document.cookie = `notes=${gameNotes}`;
  //   setIsEdit(false);
  // };
  const saveNotes = handleSaveNotes(gameNotes, setIsEdit);

  const saveName = (e) => {
    e.preventDefault();
    document.cookie = `round=${targetName}`;
    setReplaceName(false);
  };

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

    dispatch({ type: "ADD_ROUND", payload: roundData }); // --> send to a new reducer?

    setRoundNumber(roundNumber + 1);
    console.log("ROUND NUMBER IS: ", roundNumber); // remove after confirmation

    setRoundScores(newRoundScores);
    setRoundHeaders([...roundHeaders, newRoundHeader]);
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

    // Clear the fields
    setGameDate(gameDate);
    setGameNotes("Notes");
    setTotalScore(0);
    setTargetName("");
    history.push("/results");
    resetScore();
  };

  const resetScore = () => {
    // Clear the cookies related to the score (e.g., outer, inner, bulls)
    document.cookie = "outer=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "inner=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "bulls=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "notes=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "round=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

    // Reset the related state variables if needed
    setPointsOuter(0);
    setPointsInner(0);
    setBulls(0);
    setTotalScore(0);
    setRoundScores([]);
    setRoundHeaders([]);
  };

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
