import React from "react";

import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";
import { Button, Typography, Card, CardContent } from "@mui/material";
import "./RegisterPage.css";

function RegisterPage() {
  const history = useHistory();

  return (
    <div id="login-paper">
      {/* <RegisterForm /> */}

      {/* <center> */}
        <Card id="reg-message">
          <CardContent>
            {/* <Typography variant="h6">
              Have an account?{" "}
              <Button
                variant="outlined"
                onClick={() => {
                  history.push("/login");
                }}
              >
                Login
              </Button>{" "}
              Here
            </Typography> */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography variant="h4" sx={{ textAlign:"center" }}>Registration currently disabled</Typography>
            </div>
          </CardContent>
        </Card>
      {/* </center> */}
    </div>
  );
}

export default RegisterPage;
