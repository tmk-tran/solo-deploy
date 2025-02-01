import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  CardContent,
  TextField,
  FormControl,
  Button,
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

export default function Profile({ user }) {
  const dispatch = useDispatch();
  const [viewLastTen, setViewLastTen] = useState(true);

  useEffect(() => {
    if (user?.user_id) {
      const actions = [
        { type: "FETCH_GAMES", payload: user.user_id },
        { type: "FETCH_ROUNDS", payload: user.user_id },
        { type: "FETCH_ROUND_AVG", payload: user.user_id },
      ];

      actions.forEach((action) => dispatch(action)); // Loop through and dispatch each action
    }
  }, [user?.user_id]);

  const handleViewToggle = () => {
    setViewLastTen(!viewLastTen);
  };

  const currentUser = user.username;
  const userId = user.user_id;
  const userRounds = useSelector((store) => store.totalRounds);
  const games = useSelector((store) => store.gamesReducer);
  const roundAvg = useSelector((store) => store.roundAvgReducer);

  // Filter the games based on the user_id
  const filteredGames = games.filter((game) => game.user_id === userId);
  // For last 5 games, and 10 games, filter
  const lastFiveGames = filteredGames.slice(-5);
  const lastTenGames = filteredGames.slice(-10);
  const lastTenRounds = roundAvg.slice(-10);
  // Variables to pass as props to LineDot and HorizontalBars
  const scoresArrayTen = lastTenGames.map((game) => game.total_game_score);
  const scoresArrayFive = lastFiveGames.map((game) => game.total_game_score);
  const roundAvgArray = lastTenRounds.map((round) => round.average_round_score);

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
                    scoresArrayFive={scoresArrayFive}
                    scoresArrayTen={scoresArrayTen}
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
          <br />
        </CardContent>
      </Card>
    </div>
  );
}
