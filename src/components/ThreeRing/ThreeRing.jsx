import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import GameTimer from "../GameTimer/GameTimer"; // timer keeps resetting, figure out issue
import { useDispatch, useSelector } from "react-redux";
import "./ThreeRing.css";
import {
  Card,
  CardContent,
  TextField,
  FormControl,
  Button,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
// ~~~~~~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~
import getCookie from "../../hooks/cookie";
// import Swal from "sweetalert2";
// ~~~~~~~~~~~~~~~ Utils ~~~~~~~~~~~~~~~~~~
import { formatDate } from "../Utils/helpers";
import { savedAlert } from "../Utils/sweetAlerts";
// ~~~~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~
import GameInfo from "../GameInfo/GameInfo";
import GameMenu from "../GameMenu/GameMenu";
import RoundTable from "../RoundTable/RoundTable";
import ThreeRingTarget from "../ThreeRingTarget/ThreeRingTarget";
import AddRoundButton from "../AddRoundButton/AddRoundButton";

export default function ThreeRing() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [pointsOuter, setPointsOuter] = useState(getCookie("outer") || 0);
  const [pointsInner, setPointsInner] = useState(getCookie("inner") || 0);
  const [bulls, setBulls] = useState(getCookie("bulls") || 0);
  const [showSettings, setShowSettings] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [replaceName, setReplaceName] = useState(false);
  // Define state to manage round scores and round headers
  const [roundScores, setRoundScores] = useState([]); // Array to store round scores
  const [roundHeaders, setRoundHeaders] = useState([]); // Array to store round headers
  const [totalRoundScores, setTotalRoundScores] = useState(0);
  // console.log("TOTAL SCORES OF ROUNDS = ", totalRoundScores);

  // State to manage round numbers
  const [roundNumber, setRoundNumber] = useState(1);

  // from Games ~~~~~~~~~~~~~~~~~~~~~~~~~
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

  // Bring in Games
  const games = useSelector((store) => store.gamesReducer);
  console.log("GAMES: ", games);
  const gameIds = games.map((game, i) => {
    // Check if it's the last game in the array
    if (i === games.length - 1) {
      // You've reached the last game, so you can extract the ID
      const newId = game.game_id;
      return newId;
    }
    // If it's not the last game, return null or undefined, or handle it as needed.
    return null;
  });

  // Extract the last game's ID
  const newGameId = gameIds.filter((game_id) => game_id !== null)[0];
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

  // Function to handle clicking on the zone and recording points
  const clickOuter = () => {
    const newCount = Number(pointsOuter) + 8;

    // This is making a cookie called count with the newCount amount
    // It will replace anything called count
    document.cookie = `outer=${newCount}`;
    setPointsOuter(newCount);
  };

  const clickInner = (e) => {
    e.stopPropagation(); // Stop event propagation to prevent outer zone click action
    const newCount = Number(pointsInner) + 9;
    document.cookie = `inner=${newCount}`;
    setPointsInner(newCount);
  };

  const clickBull = (e) => {
    e.stopPropagation(); // Stop event propagation to prevent outer zone click action
    const newCount = Number(bulls) + 10;
    document.cookie = `bulls=${newCount}`;
    setBulls(newCount);
  };

  const toggleSettings = (e) => {
    e.preventDefault();
    setShowSettings(!showSettings);
  };

  const saveNotes = (e) => {
    e.preventDefault();
    document.cookie = `notes=${gameNotes}`;
    setIsEdit(false);
  };

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

  const buttonLabel = <QueryStatsIcon />;
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
              <Button
                variant="contained"
                color="primary"
                onClick={toggleSettings}
              >
                <MoreHorizIcon />
              </Button>
            </div>
            {showSettings ? (
              <div className="settings-div">
                <div className="round-edit">
                  <Button
                    onClick={() => setReplaceName(!replaceName)}
                    style={{ fontSize: "10px" }}
                  >
                    <EditIcon />
                    Edit Name
                  </Button>
                  <br />
                </div>
                <div className="round-table">
                  <RoundTable
                    roundHeaders={roundHeaders}
                    roundScores={roundScores}
                  />
                </div>
                <div style={{ textAlign: "right", fontSize: "12px" }}>
                  <p>8's: {pointsOuter}</p>
                  <p>9's: {pointsInner}</p>
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
                    placeholder="Game Notes"
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
        <ThreeRingTarget clickOuter={clickOuter} clickInner={clickInner} clickBull={clickBull} />
      </div>
      <AddRoundButton addRound={addRound} />
    </div>
  );
}
