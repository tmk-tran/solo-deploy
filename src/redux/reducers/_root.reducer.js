import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
// import itemsReducer from './items.reducer';
// import myItemsReducer from './myItems.reducer';
import gamesReducer from "./games.reducer";
import roundReducer from "./rounds.reducer";
import sumRound from "./sumRound.reducer";
import totalRounds from "./totalRounds.reducer";
import roundAvgReducer from "./roundScoreAvg.reducer";
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  // itemsReducer,
  // myItemsReducer,
  gamesReducer,
  roundReducer,
  sumRound,
  totalRounds,
  roundAvgReducer,
});

export default rootReducer;
