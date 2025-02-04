import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";

import {
  Button,
  Card,
  CardContent,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LineDot from "../LineDot/LineDot";
import HorizontalBars from "../HorizontalBars/HorizontalBars";
import AccountMenu from "../AccountMenu/AccountMenu";
import InsightsIcon from "@mui/icons-material/Insights";
import "./Profile.css";
// ~~~~~~~~~~~~~~~ Sweet Alert ~~~~~~~~~~~~~~~~~~
import Swal from "sweetalert2";
import { GET_GAMES_BY_USER } from "../../graphql/queries";
import LoadingBar from "../LinearProgress/LinearProgress";

export default function Profile({ user }) {
  console.log("Coming from Profile component ---> ", user);
  const dispatch = useDispatch();
  const [viewLastTen, setViewLastTen] = useState(true);

  const [filteredGames, setFilteredGames] = useState([]);
  const [scoresAFive, setScoresAFive] = useState([]);
  const [scoresATen, setScoresATen] = useState([]);
  const [roundAvgArray, setRoundAvgArray] = useState([]);

  const currentUser = user.username;
  // const userId = user.user_id;
  const { user_id: userId } = user || {}; // Fallback, will be undefined if user is null
  const userRounds = useSelector((store) => store.totalRounds);
  const games = useSelector((store) => store.gamesReducer);
  const roundAvg = useSelector((store) => store.roundAvgReducer);

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
  console.log("Coming from useQuery in Profile ---> ", userGameData);

  useEffect(() => {
    if (user?.user_id) {
      const actions = [
        // { type: "FETCH_GAMES", payload: user.user_id },
        { type: "FETCH_ROUNDS", payload: user.user_id },
        { type: "FETCH_ROUND_AVG", payload: user.user_id },
      ];

      actions.forEach((action) => dispatch(action)); // Loop through and dispatch each action
    }
  }, [user?.user_id]);

  useEffect(() => {
    if (userGameData && user) {
      const filtered = userGameData.games.filter(
        (game) => game.user_id === user.user_id
      );
      setFilteredGames(filtered);
    }
  }, [userGameData, user]);
  console.log("Filtered Games ---------> ", filteredGames);

  // Filter the games based on the user_id
  // const filteredGames = games.filter((game) => game.user_id === userId);
  // console.log("Filtered Games ---------> ", filteredGames);
  useEffect(() => {
    // Run only when filteredGames or roundAvg changes
    if (filteredGames.length > 0 && roundAvg) {
      // For last 5 games, and 10 games, filter
      const lastFiveGames = filteredGames.slice(-5);
      const lastTenGames = filteredGames.slice(-10);
      const lastTenRounds = roundAvg?.slice(-10) || [];
      // Variables to pass as props to LineDot and HorizontalBars
      const scoresArrayTen = lastTenGames.map((game) => game.total_game_score);
      setScoresATen(scoresArrayTen);
      const scoresArrayFive = lastFiveGames.map(
        (game) => game.total_game_score
      );
      setScoresAFive(scoresArrayFive);
      const roundAvgArray = lastTenRounds.map(
        (round) => round.average_round_score
      );
      setRoundAvgArray(roundAvgArray);
    }
  }, [filteredGames, roundAvg]); // Run when filteredGames or roundAvg changes

  const handleViewToggle = () => {
    setViewLastTen(!viewLastTen);
  };

  const showAlert = () => {
    Swal.fire({
      title: "Edit Profile Username",
      input: "text",
      inputValue: currentUser, // Initialize with the current username
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "custom-confirm-button",
        cancelButton: "custom-cancel-button",
      },
      inputValidator: (value) => {
        if (!value) {
          return "Username cannot be empty";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newUsername = result.value;

        // Display a confirmation dialog before saving
        Swal.fire({
          title: "Confirm Save",
          text: `Do you want to save the new username: ${newUsername}?`,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes, save it!",
          cancelButtonText: "No, cancel!",
        }).then((confirmResult) => {
          if (confirmResult.isConfirmed) {
            // Handle the new username (e.g., save it to your state or send it to the server)
            console.log("New Username:", newUsername);
            // setNewProfileName(newUsername);
            const editedItem = {
              username: newUsername,
            };
            dispatch({ type: "EDIT_USER", payload: editedItem });

            // Display an alert after saving
            Swal.fire(
              "Saved!",
              "Your profile username has been updated.",
              "success"
            );
          }
        });
      }
    });
  };

  return (
    <div className="page-container">
      <Card id="profile-card" elevation={6}>
        <CardContent>
          <AccountMenu />
          <Typography variant="h6">Profile</Typography>
          <br />
          <div className="profile-head">
            <div className="profile-name-icon">
              <AccountCircleIcon
                style={{ fontSize: "40px", marginRight: "5px" }}
              />
              <div className="current-user">
                <Typography variant="body1">{currentUser}</Typography>
                {userRounds.map((rounds, index) => (
                  <div key={index}>
                    <Typography variant="body2">
                      Total Rounds Played: {rounds.total_rounds_played}
                    </Typography>
                  </div>
                ))}
                <br />
              </div>
            </div>
            <Button onClick={showAlert}>
              <ArrowForwardIosIcon />
            </Button>
          </div>
          <Typography variant="h6">Dashboard</Typography>
          <br />

          {loading ? (
            <Stack direction="row" justifyContent="center">
              <LoadingBar />
            </Stack>
          ) : (
            <div
              className="dashboard-container"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Card elevation={12} style={{ borderRadius: "10px" }}>
                  <CardContent>
                    <div style={{ display: "flex", justifyContent: "right" }}>
                      <Button
                        variant="outlined"
                        onClick={handleViewToggle}
                        style={{ borderRadius: "10px" }}
                      >
                        <InsightsIcon />
                        &nbsp;{viewLastTen ? "5" : "10"}
                      </Button>
                    </div>
                    <LineDot
                      viewLastTen={viewLastTen}
                      scoresArrayFive={scoresAFive}
                      scoresArrayTen={scoresATen}
                    />
                    <Card elevation={5} style={{ borderRadius: "10px" }}>
                      <CardContent style={{ textAlign: "center" }}>
                        <Typography>
                          Data from the last{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {viewLastTen ? "10" : "5"}
                          </span>{" "}
                          games
                        </Typography>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </div>
              <br />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Card elevation={12} style={{ borderRadius: "10px" }}>
                  <CardContent>
                    <HorizontalBars roundAvgArray={roundAvgArray} />
                    <Card elevation={5} style={{ borderRadius: "10px" }}>
                      <CardContent>
                        <Typography style={{ textAlign: "center" }}>
                          (Last 10 Games)
                        </Typography>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          <br />
        </CardContent>
      </Card>
    </div>
  );
}
