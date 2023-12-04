import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="container">
      <h2>Welcome to ScoreMark</h2>
      <div>
        <Typography variant="body1">
          Welcome to ScoreMark! This app is designed to help target shooters
          track their shooting performance and improve their skills on the
          range.
        </Typography>
        <br />
        <br />
        <Typography variant="h6">Features:</Typography>
        <Box
          style={{
            display: "inline-block",
            textAlign: "left",
            justifyContent: "center",
          }}
        >
          <ul>
            <li>
              <Typography>Record and store your shooting scores</Typography>
            </li>
            <li>
              <Typography>Track your progress over time</Typography>
            </li>
            <li>
              <Typography>
                View detailed statistics and analysis of your shooting
                performance
              </Typography>
            </li>
            <li>
              <Typography>
                Record notes/goals to further measure your improvement
              </Typography>
            </li>
          </ul>
        </Box>
        <br />
        <Typography variant="body1">
          Whether you're a novice or an experienced shooter, ScoreMark can
          assist you in honing your skills and achieving your shooting goals.
        </Typography>
      </div>
      <div className="grid-col grid-col_4">
        {/* <RegisterForm /> */}

        <center>
          <h4>Already a Member?</h4>
          <button className="btn btn_sizeSm" onClick={onLogin}>
            Login
          </button>
        </center>
      </div>
    </div>
  );
}

export default LandingPage;
