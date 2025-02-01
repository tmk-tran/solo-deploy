import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch as ReactRouterSwitch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";
import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import Games from "../Games/Games";
import Rounds from "../Rounds/Rounds";
import Profile from "../Profile/Profile";
import History from "../History/History";
import GamesPage from "../GamesPage/GamesPage";
import ThreeRing from "../ThreeRing/ThreeRing";
import FourRing from "../FourRing/FourRing";
import FiveRing from "../FiveRing/FiveRing";
import Trap from "../Trap/Trap";
import QuickRound from "../QuickRound/QuickRound";
import Bulls from "../Bulls/Bulls";
import Results from "../Results/Results";
import SuccessPage from "../SuccessPage/SuccessPage";
import TestComp from "../TestComponent/TestComponent";
import MiniDrawer from "../MiniDrawer/MiniDrawer";
import Train from "../Train/Train";
import SpeedDial from "../SpeedDial/SpeedDial";
import { Paper, Switch as MuiSwitch } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const customTypography = {
  // coming back to visit
  h5: {
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.4rem",
    },
    "@media (min-width:960px)": {
      fontSize: "1.6rem",
    },
  },
  fontFamily: "verdana",
};

const darkTheme = createTheme({
  palette: { mode: "dark" },
  typography: customTypography,
});
const lightTheme = createTheme({
  palette: { mode: "light" },
  typography: { fontFamily: "verdana" },
});

// Set up the API URL for your GraphQL endpoint
const client = new ApolloClient({
  uri: "https://api.devii.io/query", // Endpoint for queries
  cache: new InMemoryCache(), // Apollo's memory cache
});

function App() {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(true);
  const theme = darkMode ? darkTheme : lightTheme;
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Store the preference in localStorage
    localStorage.setItem("darkMode", !darkMode);
  };

  const user = useSelector((store) => store.user);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    setDarkMode(storedDarkMode === "true"); // Convert the stored string to a boolean
    dispatch({ type: "FETCH_USER" });
    dispatch({ type: "FETCH_GAMES" });
    dispatch({ type: "FETCH_ROUNDS" });
    dispatch({ type: "FETCH_TOTAL_ROUNDS" });
    dispatch({ type: "FETCH_ROUND_AVG" });
  }, [dispatch]);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <div className="dark-mode-btn">
              <MuiSwitch
                id="fixed-button"
                defaultChecked
                onChange={toggleDarkMode}
              />
            </div>
            <Navbar />
            {/* <Nav /> */}
            {/* <MiniDrawer /> */}
            <ReactRouterSwitch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />

              {/* Visiting localhost:3000/about will show the about page. */}
              <Route
                // shows AboutPage at all times (logged in or not)
                exact
                path="/about"
              >
                <AboutPage />
              </Route>

              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
              <ProtectedRoute
                // logged in shows UserPage else shows LoginPage
                exact
                path="/user"
              >
                <UserPage />
              </ProtectedRoute>

              <ProtectedRoute exact path="/games-admin">
                <Games />
              </ProtectedRoute>

              <ProtectedRoute exact path="/rounds-admin">
                <Rounds />
              </ProtectedRoute>

              <ProtectedRoute exact path="/profile">
                <Profile user={user} />
              </ProtectedRoute>

              <ProtectedRoute exact path="/history">
                <History />
              </ProtectedRoute>

              <ProtectedRoute exact path="/train">
                <Train />
              </ProtectedRoute>

              <ProtectedRoute exact path="/games">
                <GamesPage />
              </ProtectedRoute>

              <ProtectedRoute
                // logged in shows game page else shows LoginPage
                exact
                path="/3-ring"
              >
                <ThreeRing />
              </ProtectedRoute>

              <ProtectedRoute exact path="/4-ring">
                <FourRing />
              </ProtectedRoute>

              <ProtectedRoute exact path="/5-ring">
                <FiveRing />
              </ProtectedRoute>

              <ProtectedRoute exact path="/trap">
                <Trap />
              </ProtectedRoute>

              <ProtectedRoute exact path="/quickround">
                <QuickRound />
              </ProtectedRoute>

              <ProtectedRoute exact path="/bulls">
                <Bulls />
              </ProtectedRoute>

              <ProtectedRoute exact path="/success">
                <SuccessPage />
              </ProtectedRoute>

              <ProtectedRoute exact path="/results">
                <Results />
              </ProtectedRoute>

              <ProtectedRoute exact path="/test">
                {/* <MiniDrawer /> */}
                <TestComp />
              </ProtectedRoute>

              <Route exact path="/login">
                {user.user_id ? (
                  // If the user is already logged in,
                  // redirect to the /user page
                  <Redirect to="/user" />
                ) : (
                  // Otherwise, show the login page
                  <LoginPage />
                )}
              </Route>

              <Route exact path="/registration">
                {user.user_id ? (
                  // If the user is already logged in,
                  // redirect them to the /user page
                  <Redirect to="/user" />
                ) : (
                  // Otherwise, show the registration page
                  <RegisterPage />
                )}
              </Route>

              <Route exact path="/home">
                {user.user_id ? (
                  // If the user is already logged in,
                  // redirect them to the /user page
                  <Redirect to="/user" />
                ) : (
                  // Otherwise, show the Landing page
                  <LandingPage />
                )}
              </Route>

              {/* If none of the other routes matched, we will show a 404. */}
              <Route>
                <h1>404</h1>
              </Route>
            </ReactRouterSwitch>
            {/* <SpeedDial /> */}
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
