import { useSelector } from "react-redux";

const useRoundId = () => {
  const rounds = useSelector((store) => store.roundReducer);

  const roundIds = rounds.map((round, i) => {
    // Check if it's the last score in the array
    if (i === rounds.length - 1) {
      // You've reached the last score, so you can extract the ID
      const rId = round.round_id;
      return rId;
    }
    // If it's not the last object, return null or undefined, or handle it as needed.
    return null;
  });

  return roundIds.filter((round_id) => round_id !== null)[0];
};

export default useRoundId;
