import React, { useState } from "react";

// ~~~~~~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~
import getCookie from "../../hooks/cookie";
import RoundTracker from "../RoundTracker/RoundTracker";

export default function TestComp() {
  const [showSettings, setShowSettings] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [replaceName, setReplaceName] = useState(false);
  // Define state to manage round scores and round headers
  const [roundScores, setRoundScores] = useState([]); // Array to store round scores
  const [roundHeaders, setRoundHeaders] = useState([1]); // Array to store round headers
  const [totalRoundScores, setTotalRoundScores] = useState(0);
  console.log("TOTAL SCORES OF ROUNDS = ", totalRoundScores);

  // State to manage round numbers
  const [roundNumber, setRoundNumber] = useState(1);

  // from Games ~~~~~~~~~~~~~~~~~~~~~~~~~
  const [totalScore, setTotalScore] = useState(0);
  const [gameDate, setGameDate] = useState(new Date()); // Initialize with the current date
  console.log("GAME DATE IS:", gameDate);
  const [gameNotes, setGameNotes] = useState("Notes");
  const [targetName, setTargetName] = useState("Test");
  const [targetScore, setTargetScore] = useState(0); // update this when we decide what it is for

  return (
    <div className="page-container" style={{ backgroundImage: "none", position: "relative", top: "10px" }}>
      <RoundTracker
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        replaceName={replaceName}
        setReplaceName={setReplaceName}
        roundScores={roundScores}
        setRoundScores={setRoundScores}
        roundHeaders={roundHeaders}
        setRoundHeaders={setRoundHeaders}
        totalRoundScores={totalRoundScores}
        setTotalRoundScores={setTotalRoundScores}
        roundNumber={roundNumber}
        setRoundNumber={setRoundNumber}
        totalScore={totalScore}
        setTotalScore={setTotalScore}
        gameDate={gameDate}
        setGameDate={setGameDate}
        gameNotes={gameNotes}
        setGameNotes={setGameNotes}
        targetName={targetName}
        setTargetName={setTargetName}
        targetScore={targetScore}
        setTargetScore={setTargetScore}
      />
    </div>
  );
}