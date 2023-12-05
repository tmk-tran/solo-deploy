import { useSelector } from "react-redux";

const useGameId = () => {
  const games = useSelector((store) => store.gamesReducer);

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
  return gameIds.filter((game_id) => game_id !== null)[0];
};

export default useGameId;
