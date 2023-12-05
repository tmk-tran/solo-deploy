import { useSelector } from "react-redux";

const useGames = () => {
  return useSelector((store) => store.gamesReducer);
};

export default useGames;