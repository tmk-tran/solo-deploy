import { useSelector } from "react-redux";

const useRounds = () => {
  return useSelector((store) => store.roundReducer);
};

export default useRounds;
