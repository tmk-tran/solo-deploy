import axios from "axios";
import { call, takeEvery, put } from "redux-saga/effects";
import client from "../../graphql/client";
import { GET_GAMES_BY_USER } from "../../graphql/queries";

function* fetchGameSaga(action) {
  try {
    const userId = action.payload;

    // const items = yield axios.get("/api/games");
    // const currentGame = items.data[items.data.length - 1].game_id;
    // yield put({ type: "SET_GAMES", payload: items.data, currentGame });

    // DEVII SECTION - slower load than using redux, use gql query client side
    // Construct the variables
    const filter = `user_id = ${userId}`;
    const ordering = ["game_id"];

    // Make the graphQL query here, no need for router now
    const response = yield call(client.query, {
      query: GET_GAMES_BY_USER,
      variables: { filter, ordering },
    });
    console.log("GAMES_BY_USER = ", response);

    yield put({ type: "SET_GAMES", payload: response.data.games });
  } catch (error) {
    console.log("error in fetchTargetsSaga", error);
  }
}

function* addGameSaga(action) {
  try {
    const response = yield axios.post("/api/games", action.payload);
    console.log("GAME_ID = ", response.data.game_id);
    yield put({ type: "FETCH_GAMES" });
  } catch (error) {
    console.log("error in addTargetSaga", error);
  }
}

function* deleteGameSaga(action) {
  try {
    yield axios.delete(`/api/games/${action.payload}`);
    // alert("Game Deleted!");
    yield put({ type: "FETCH_GAMES" });
  } catch (error) {
    console.log("error with DELETE saga request", error);
  }
}

function* editGameSaga(action) {
  try {
    yield axios.put(`/api/games/${action.payload}`, action.payload);
    // alert("Game Edited!");
    yield put({ type: "FETCH_GAMES" });
  } catch (error) {
    console.log("error with EDIT saga request", error);
  }
}

export default function* itemsSaga() {
  yield takeEvery("FETCH_GAMES", fetchGameSaga);
  yield takeEvery("ADD_GAME", addGameSaga);
  yield takeEvery("DELETE_GAME", deleteGameSaga);
  yield takeEvery("EDIT_GAME", editGameSaga);
}
