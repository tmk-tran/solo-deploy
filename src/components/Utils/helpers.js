import { TableRow, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

// Styling for Rounds Table
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  // "&:last-child td, &:last-child th": {
  //   border: 0,
  // },
  // "&:last-child": {
  //   borderBottom: '1px solid white', // Add a border to the last row
  // },
}));

// Format the date to mm/dd/yyyy
export function formatDate(inputDate) {
  const date = new Date(inputDate);
  return date.toLocaleDateString("en-US");
};

// Icon for GameMenu
export const buttonLabel = <QueryStatsIcon />;

// Adding Rounds
export const handleAddRound =
  (
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
  ) =>
  (e) => {
    e.preventDefault();

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

// Add Game
export const handleAddGame =
  (
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
    resetScore,
  ) => () => {
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