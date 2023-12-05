// Outer Zone
const handleOuterClick = (pointsOuter, setPointsOuter) => (e) => {
  const newCount = Number(pointsOuter) + 8;

  // This is making a cookie called count with the newCount amount
  // It will replace anything called count
  document.cookie = `outer=${newCount}`;
  setPointsOuter(newCount);
};

// Inner Zone
const handleInnerClick = (pointsInner, setPointsInner) => (e) => {
  e.stopPropagation(); // Stop event propagation to prevent outer zone click action
  const newCount = Number(pointsInner) + 9;
  document.cookie = `inner=${newCount}`;
  setPointsInner(newCount);
};

// Bullseye Zone
const handleBullClick = (bulls, setBulls) => (e) => {
  e.stopPropagation(); // Stop event propagation to prevent outer zone click action
  const newCount = Number(bulls) + 10;
  document.cookie = `bulls=${newCount}`;
  setBulls(newCount);
};

// Settings
const handleToggleSettings = (showSettings, setShowSettings) => (e) => {
  e.preventDefault();
  setShowSettings(!showSettings);
};

// Notes
const handleSaveNotes = (gameNotes, setIsEdit) => (e) => {
  e.preventDefault();
  document.cookie = `notes=${gameNotes}`;
  setIsEdit(false);
};

// Name
const handleSaveName = (targetName, setReplaceName) => (e) => {
  e.preventDefault();
  document.cookie = `round=${targetName}`;
  setReplaceName(false);
};

export { handleBullClick };
export { handleInnerClick };
export { handleOuterClick };
export { handleToggleSettings };
export { handleSaveNotes };
export { handleSaveName };
