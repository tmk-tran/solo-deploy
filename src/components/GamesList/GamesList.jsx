import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Card,
  CardContent,
  TextField,
  FormControl,
  Button,
  Typography,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import "./GamesList.css";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
// ~~~~~~~~~~~~~~~ Sweet Alert ~~~~~~~~~~~~~~~~~~
import Swal from "sweetalert2/dist/sweetalert2.js";
import "animate.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableRowRound = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgb(164 165 193 / 81%)",
  },
}));

export default function GamesList({ target, roundScores }) {
  console.log("RoundScores in GamesList -----> ", roundScores);
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [gameId, setGameId] = useState("");
  const [editGameDate, setEditGameDate] = useState(
    formatDate(target.game_date)
  );
  const [editGameNotes, setEditGameNotes] = useState(target.game_notes);
  const [editTargetName, setEditTargetName] = useState(target.target_name);
  const [editScore, setEditScore] = useState(target.target_score_value);
  const [editTotalScore, setEditTotalScore] = useState(target.total_game_score);

  function handleEdit() {
    setEdit(!edit);
    setEditGameDate(formatDate(target.game_date));
    setGameId(target.game_id);
  }

  const saveEdit = () => {
    console.log("clicked saveEdit");
    if (editScore === "") {
      editScore = 0;
      // update later, when decided on what score is used for
    }

    const editedItem = {
      game_id: gameId,
      game_date: editGameDate,
      game_notes: editGameNotes,
      target_name: editTargetName,
      target_score_value: editScore,
      total_game_score: editTotalScore,
    };

    dispatch({ type: "EDIT_GAME", payload: editedItem });

    setEdit(false);
    savedAlert();
  };

  // format the date to mm/dd/yyyy
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US");
  }

  // Find the largest score using reduce
  const largestScore = roundScores.reduce((maxScore, round) => {
    return Math.max(maxScore, round.round_score);
  }, -Infinity); // Start with negative infinity to ensure any score is greater
  // Now, `largestScore` contains the largest score

  const sweetAlert = () => {
    Swal.fire({
      title: "Delete Game?",
      width: 600,
      padding: "3em",
      color: "#716add",
      // background: "#fff url(/images/trees.png)",
      backdrop: `
      rgba(0,0,123,0.4)
      url("/images/nyan-cat.gif")
      left top
      no-repeat
    `,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "DELETE_GAME",
          payload: target.game_id,
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const savedAlert = () => {
    Swal.fire({
      title: "Game Saved!",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      confirmButtonColor: "#3085d6",
    });
  };

  return (
    <Card id="games-list-card" elevation={12}>
      <CardContent>
        <div className="list-header">
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleEdit}
            style={{ marginLeft: "auto" }}
          >
            {!edit ? <MoreHorizIcon /> : <ArrowBackIcon />}
          </Button>
        </div>
        <hr />
        {target.user_id && edit ? (
          // Render an input field in edit mode
          <div className="edit-mode">
            <Card id="edit-card" elevation={8} style={{ margin: "0 auto" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgb(18 29 94)",
                    borderRadius: "10px",
                    color: "ghostwhite",
                  }}
                >
                  Edit Game
                </Typography>
                <br />
                <TextField
                  label="Date"
                  type="date"
                  value={editGameDate}
                  onChange={(e) => setEditGameDate(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Notes"
                  multiline
                  maxRows={3}
                  value={editGameNotes}
                  onChange={(e) => setEditGameNotes(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Target Name"
                  type="text"
                  value={editTargetName}
                  onChange={(e) => setEditTargetName(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Total Game Score"
                  type="number"
                  value={editTotalScore}
                  onChange={(e) => setEditTotalScore(e.target.value)}
                  fullWidth
                  style={{ marginRight: "5px" }}
                />
                <TextField
                  label="Target Score Value"
                  type="number"
                  value={editScore}
                  onChange={(e) => setEditScore(e.target.value)}
                  fullWidth
                />
                <div className="list-buttons">
                  <Button
                    onClick={sweetAlert}
                    variant="outlined"
                    sx={{
                      "&:hover": {
                        backgroundColor: "crimson", // Background color on hover
                        color: "white", // Text color on hover (if needed)
                      },
                    }}
                  >
                    Delete
                  </Button>
                  <Button onClick={saveEdit}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Render the formatted date in non-edit mode
          <div className="game-list-display-container">
            <Card elevation={8} id="history-card">
              <CardContent>
                <Table sx={{ minWidth: 200, marginLeft: "auto" }} size="small">
                  <TableHead>
                    <TableRow sx={{ "&:last-child th": { border: 0 } }}>
                      <StyledTableCell>
                        <Typography variant="h6">
                          Date: {formatDate(target.game_date)}
                        </Typography>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <StyledTableCell>
                        <EmojiEventsOutlinedIcon />
                        Best Round: {largestScore} points
                      </StyledTableCell>
                    </TableRow>
                    <StyledTableRow>
                      <StyledTableCell className="game-history">
                        <ListItemText primary="Notes: " />
                        {target.game_notes !== (null || "Notes") ? (
                          target.game_notes
                        ) : (
                          <SpeakerNotesOffIcon />
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell className="game-history">
                        <ListItem
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <ListItemText primary="Target: " />
                          <Typography style={{ fontWeight: "bold" }}>
                            {target.target_name !== (null || "") ? (
                              target.target_name
                            ) : (
                              <DriveFileRenameOutlineIcon />
                            )}
                          </Typography>
                        </ListItem>
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell className="game-history">
                        <ListItem
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <ListItemText primary="Total Score: " />
                          <Typography style={{ fontWeight: "bold" }}>
                            {target.total_game_score}
                          </Typography>
                        </ListItem>
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell className="game-history">
                        <ListItem
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <ListItemText primary="Game Score: " />
                          <Typography style={{ fontWeight: "bold" }}>
                            {target.target_score_value !== (null || 0)
                              ? target.target_score_value
                              : "None Set"}
                          </Typography>
                        </ListItem>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            {/* Right Square for Round Data */}
            <Card
              className="round-info"
              elevation={8}
              style={{ backgroundColor: "rgb(130 132 173 / 81%)" }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Round Data
                </Typography>
                <br />
                <Table sx={{ minWidth: 250 }} size="small">
                  <TableHead>
                    <TableRow sx={{ "&:last-child th": { border: 0 } }}>
                      <StyledTableCell>#</StyledTableCell>
                      <StyledTableCell>Score</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {roundScores.map((round, index) => (
                      <StyledTableRowRound key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{round.round_score} points</TableCell>
                      </StyledTableRowRound>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
