// Bullseye click
const handleBullClick = (bulls, setBulls) => (e) => {
  e.stopPropagation(); // Stop event propagation to prevent outer zone click action
  const newCount = Number(bulls) + 10;
  setBulls(newCount);
};

export { handleBullClick };
