/* --------------------------------------------------------------------------------
Fifth Ring
-------------------------------------------------------------------------------- */
const handleFifthClick = (pointsFifth, setPointsFifth) => (e) => {
  e.stopPropagation();
  const newCount = Number(pointsFifth) + 6;
  document.cookie = `fifth=${newCount}`;
  setPointsFifth(newCount);
};

/* --------------------------------------------------------------------------------
Fourth Ring
-------------------------------------------------------------------------------- */
const handleFourthClick = (pointsFourth, setPointsFourth) => (e) => {
  e.stopPropagation();
  const newCount = Number(pointsFourth) + 7;
  document.cookie = `fourth=${newCount}`;
  setPointsFourth(newCount);
};

/* --------------------------------------------------------------------------------
Outer Zone (third ring)
-------------------------------------------------------------------------------- */
const handleOuterClick = (pointsOuter, setPointsOuter) => (e) => {
  const newCount = Number(pointsOuter) + 8;
  e.stopPropagation();
  // This is making a cookie called count with the newCount amount
  // It will replace anything called count
  document.cookie = `outer=${newCount}`;
  setPointsOuter(newCount);
};

/* --------------------------------------------------------------------------------
Inner Zone (second ring)
-------------------------------------------------------------------------------- */
const handleInnerClick = (pointsInner, setPointsInner) => (e) => {
  e.stopPropagation(); // Stop event propagation to prevent outer zone click action
  const newCount = Number(pointsInner) + 9;
  document.cookie = `inner=${newCount}`;
  setPointsInner(newCount);
};

/* --------------------------------------------------------------------------------
Bullseye Zone
-------------------------------------------------------------------------------- */
const handleBullClick = (bulls, setBulls) => (e) => {
  e.stopPropagation(); // Stop event propagation to prevent outer zone click action
  const newCount = Number(bulls) + 10;
  document.cookie = `bulls=${newCount}`;
  setBulls(newCount);
};

/* --------------------------------------------------------------------------------
Trap Hits
-------------------------------------------------------------------------------- */
import { perfectGame } from "./sweetAlerts";

const handleHit = (trapHit, setTrapHit) => (e) => {
  e.preventDefault();
  setTrapHit(trapHit + 1);
  document.cookie = `hits=${trapHit}`;
  if (trapHit >= 25) {
    setTrapHit(25);
    perfectGame();
  }
};

/* --------------------------------------------------------------------------------
QuickRound Hits
-------------------------------------------------------------------------------- */
const handleTargetHit = (hit, setHit, hitDisplay, setHitDisplay) => (e) => {
  e.preventDefault();
  const hitCount = Number(hit) + 1;
  document.cookie = `hit_quick=${hitCount}`;
  setHit(hitCount);
  setHitDisplay(hitDisplay + 1);
};

/* --------------------------------------------------------------------------------
QuickRound Misses
-------------------------------------------------------------------------------- */
const handleTargetMiss = (miss, setMiss) => (e) => {
  e.preventDefault();
  const missCount = Number(miss) + 1;
  document.cookie = `miss_quick=${missCount}`;
  setMiss(missCount);
};

/* --------------------------------------------------------------------------------
Settings
-------------------------------------------------------------------------------- */
const handleToggleSettings = (showSettings, setShowSettings) => (e) => {
  e.preventDefault();
  setShowSettings(!showSettings);
};

/* --------------------------------------------------------------------------------
Notes
-------------------------------------------------------------------------------- */
const handleSaveNotes = (gameNotes, setIsEdit) => (e) => {
  e.preventDefault();
  document.cookie = `notes=${gameNotes}`;
  setIsEdit(false);
};

/* --------------------------------------------------------------------------------
Game Session Name
-------------------------------------------------------------------------------- */
const handleSaveName = (targetName, setReplaceName) => (e) => {
  e.preventDefault();
  document.cookie = `round=${targetName}`;
  setReplaceName(false);
};

export { handleFifthClick };
export { handleFourthClick };
export { handleOuterClick };
export { handleInnerClick };
export { handleBullClick };
export { handleHit };
export { handleTargetHit };
export { handleTargetMiss };
export { handleToggleSettings };
export { handleSaveNotes };
export { handleSaveName };
