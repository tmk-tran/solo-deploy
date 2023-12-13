import { TableRow, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

/* --------------------------------------------------------------------------------
Styling for Rounds Table
-------------------------------------------------------------------------------- */
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
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* --------------------------------------------------------------------------------
Format the date to mm/dd/yyyy
-------------------------------------------------------------------------------- */
export function formatDate(inputDate) {
  const date = new Date(inputDate);
  return date.toLocaleDateString("en-US");
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* --------------------------------------------------------------------------------
Icon for GameMenu
-------------------------------------------------------------------------------- */
export const buttonLabel = <QueryStatsIcon />;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* --------------------------------------------------------------------------------
Adding Rounds
-------------------------------------------------------------------------------- */
export const handleAddRound =
  (
    ringPoints,
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
    additionalCallback,
    componentName,
    ...stateSetters
  ) =>
  (e) => {
    e.preventDefault();

    const newRoundScore =
      componentName === "Trap"
        ? Number(ringPoints)
        : componentName === "QuickRound"
        ? Number(ringPoints[2])
        : ringPoints.reduce((sum, points) => sum + Number(points), 0);

    // Create a new array of round scores with the current total score (with conditions)
    const newRoundScores =
      componentName === "Trap" || componentName === "QuickRound"
        ? [...roundScores, newRoundScore]
        : [...roundScores, totalScore];

    const sumRoundScores = newRoundScores.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );

    setTotalRoundScores(sumRoundScores);

    // Increment the round header
    const newRoundHeader = roundHeaders.length + 1;

    const roundData = {
      game_id: newGameId,
      round_number: roundNumber,
      round_score: newRoundScore,
    };

    dispatch({ type: "ADD_ROUND", payload: roundData }); // --> send to a new reducer?

    setRoundNumber(roundNumber + 1);
    setRoundScores(newRoundScores);
    setRoundHeaders([...roundHeaders, newRoundHeader]);

    // Apply additional custom logic via the callback
    if (additionalCallback) {
      additionalCallback();
    }
    // Clear the input fields
    stateSetters.forEach((setter) => setter(0));
  };

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* --------------------------------------------------------------------------------
Add Game
-------------------------------------------------------------------------------- */
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
    resetScore
  ) =>
  () => {
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
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* --------------------------------------------------------------------------------
Clear Scores
-------------------------------------------------------------------------------- */
export const handleClearScores =
  (
    gameDate,
    setGameDate,
    setGameNotes,
    setRoundNumber,
    resetScore,
    ...stateSetters
  ) =>
  (e) => {
    e.preventDefault();
    // Additional resets
    setGameDate(gameDate);
    setGameNotes("Notes");
    setRoundNumber(1);
    resetScore();

    // Clear the input fields
    stateSetters.forEach((setter) => setter(0));
  };

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* --------------------------------------------------------------------------------
Reset Scores and Cookies
-------------------------------------------------------------------------------- */
export const handleResetScore = (cookiesToClear, ...stateToReset) => {
  // Clear the specified cookies
  cookiesToClear.forEach((cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  });

  // Reset the specified state variables
  stateToReset.forEach((resetTarget) => {
    resetTarget([]);
  });
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* --------------------------------------------------------------------------------
Format Targets
-------------------------------------------------------------------------------- */
export const formatTargets = (targets) => {
  return targets.map((target) => `${target.label}: ${target.points}`);
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
