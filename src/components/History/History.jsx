import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_GAMES_BY_USER } from "../../graphql/queries";

import {
  Box,
  Paper,
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

// Component
import GamesList from "../GamesList/GamesList";
import LoadingBar from "../LinearProgress/LinearProgress";

export default function History() {
  // const dispatch = useDispatch();

  const gameList = useSelector((store) => store.gamesReducer); // possible change of name here
  const reversedGameList = [...gameList].reverse();
  const rounds = useSelector((store) => store.roundReducer);
  console.log("ROUNDS ARE:", rounds);
  const user = useSelector((store) => store.user);
  const userId = user.user_id;
  console.log("USER ID IN HISTORY = ", userId);

  // useEffect(() => {
  //   //   dispatch({ type: "FETCH_GAMES" });
  //   if (rounds) {
  //     const filteredRounds = rounds.filter(
  //       (round) => round.game_id === target.game_id
  //     );
  //     setRoundsProp(filteredRounds);
  //   }
  // }, [rounds]);
  // This useEffect will update `roundsProp` based on the current target's `game_id`

  // Define variables to send with query
  const filter = `user_id = ${userId}`;
  const ordering = ["game_id"];
  // Use the `useQuery` hook to fetch data instead of saga, redux
  const {
    loading,
    error,
    data: userGameData,
  } = useQuery(GET_GAMES_BY_USER, {
    variables: { filter, ordering },
    skip: !userId, // Skip the query if userId is not available
  });
  console.log("Coming from useQuery in History ---> ", userGameData);

  if (loading) {
    // Use this block to display the loading indicator
    return (
      <div className="page-container">
        <Box sx={{ width: "100%" }}>
          <LoadingBar />
        </Box>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Box sx={{ width: "100%" }}>
        {/* <Paper id="history-paper">
          {reversedGameList.map((target) => (
            <CardContent key={target.game_id} style={{ marginBottom: "15px" }}>
              <GamesList
                target={target}
                roundScores={rounds.filter(
                  (round) => round.game_id === target.game_id
                )}
              />
            </CardContent>
          ))}
        </Paper> */}
        <Typography
          variant="h4"
          style={{ textAlign: "center", color: "white" }}
        >
          History
        </Typography>
        <br />
        <Paper id="history-paper">
          {userGameData?.games.map((target) => {
            // Add a condition to check if the user_id matches the desired userId
            if (target.user_id === userId) {
              return (
                <CardContent
                  key={target.game_id}
                  style={{ marginBottom: "15px" }}
                >
                  <GamesList
                    target={target}
                    roundScores={rounds.filter(
                      (round) => round.game_id.toString() === target.game_id
                    )}
                  />
                </CardContent>
              );
            } else {
              return null; // Return null for items that don't match the user_id
            }
          })}
        </Paper>
      </Box>
    </div>
  );
}
