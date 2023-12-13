import { useState } from "react";
// ~~~~~~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~
import getCookie from "../../hooks/cookie";

export const useSharedState = (targetStyle) => {
  const [pointsOuter, setPointsOuter] = useState(getCookie("outer") || 0);
  const [pointsInner, setPointsInner] = useState(getCookie("inner") || 0);
  const [bulls, setBulls] = useState(getCookie("bulls") || 0);
  const [showSettings, setShowSettings] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [replaceName, setReplaceName] = useState(false);
  // ~~~~~~~~~~ Round scores and round headers ~~~~~~~~~~
  const [roundScores, setRoundScores] = useState([]); // Array to store round scores
  const [roundHeaders, setRoundHeaders] = useState([1]); // Array to store round headers
  const [totalRoundScores, setTotalRoundScores] = useState(0);
  // ~~~~~~~~~~ Round numbers ~~~~~~~~~~
  const [roundNumber, setRoundNumber] = useState(1);
  // ~~~~~~~~~~ Game State ~~~~~~~~~~
  const [gameDate, setGameDate] = useState(new Date()); // Initialize with the current date
  const [gameNotes, setGameNotes] = useState(getCookie("notes") || "Notes");
  const [targetName, setTargetName] = useState(`${targetStyle}`);
  const [targetScore, setTargetScore] = useState(0);

  return {
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
    setTargetScore,
  };
};
