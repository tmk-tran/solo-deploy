import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Card,
  CardContent,
  TextField,
  FormControl,
  Button,
  Typography,
  List,
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
import VideogameAssetOffIcon from "@mui/icons-material/VideogameAssetOff";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
// ~~~~~~~~~~~~~~~ Sweet Alert ~~~~~~~~~~~~~~~~~~
import Swal from "sweetalert2/dist/sweetalert2.js";

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

export default function GamesList({ target, roundScores }) {
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

  // const rounds = useSelector((store) => store.roundReducer);
  // const roundScores = rounds.map((round) => round.round_score);
  // console.log(roundScores);

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
      title: "Custom width, padding, color, background.",
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
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
              type: "DELETE_GAME",
              payload: target.game_id,
            })
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <Card id="games-list-card">
      <CardContent>
        <div className="list-header">
          <button onClick={sweetAlert}>F</button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleEdit}
            style={{ marginLeft: "auto" }}
          >
            <MoreHorizIcon />
          </Button>
        </div>
        <hr />
        {target.user_id && edit ? (
          // Render an input field in edit mode
          <div className="edit-mode">
            <Card elevation={8} style={{ margin: "0 auto" }}>
              <List>
                <Typography
                  variant="h5"
                  style={{
                    textAlign: "center",
                    backgroundColor: "black",
                    color: "ghostwhite",
                  }}
                >
                  Edit Game
                </Typography>
                <br />
                <ListItem>
                  <TextField
                    label="Date"
                    type="date"
                    value={editGameDate}
                    onChange={(e) => setEditGameDate(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    label="Notes"
                    multiline
                    maxRows={3}
                    value={editGameNotes}
                    onChange={(e) => setEditGameNotes(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    label="Target Name"
                    type="text"
                    value={editTargetName}
                    onChange={(e) => setEditTargetName(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    label="Total Game Score"
                    type="text"
                    value={editScore}
                    onChange={(e) => setEditScore(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    label="Target Score Value"
                    type="text"
                    value={editTotalScore}
                    onChange={(e) => setEditTotalScore(e.target.value)}
                  />
                </ListItem>
                <div className="list-buttons">
                  <Button
                    // onClick={() =>
                    //   dispatch({
                    //     type: "DELETE_GAME",
                    //     payload: target.game_id,
                    //   })
                    // }
                    onClick={sweetAlert}
                    variant="contained"
                    style={{ backgroundColor: "crimson" }}
                  >
                    Delete
                  </Button>
                  <Button onClick={saveEdit}>Save</Button>
                </div>
              </List>
            </Card>
          </div>
        ) : (
          // Render the formatted date in non-edit mode
          <div className="game-list-display-container">
            <Table sx={{ minWidth: 200, marginLeft: "auto" }} size="small">
              <TableHead>
                <TableRow sx={{ "&:last-child th": { border: 0 } }}>
                  <StyledTableCell>
                    Date: {formatDate(target.game_date)}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <StyledTableCell>
                    <EmojiEventsOutlinedIcon />
                    {largestScore} points
                  </StyledTableCell>
                </TableRow>
                <StyledTableRow>
                  <StyledTableCell className="game-history">
                    Notes:{" "}
                    {target.game_notes !== (null || "") ? (
                      target.game_notes
                    ) : (
                      <SpeakerNotesOffIcon />
                    )}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell className="game-history">
                    Target:{" "}
                    {target.target_name !== (null || "") ? (
                      target.target_name
                    ) : (
                      <DriveFileRenameOutlineIcon />
                    )}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell className="game-history">
                    Total Score: {target.total_game_score}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell className="game-history">
                    Game Score:{" "}
                    {target.target_score_value !== (null || 0) ? (
                      target.target_score_value
                    ) : (
                      <VideogameAssetOffIcon />
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
            <Card className="round-info" elevation={7}>
              <CardContent>
                <Typography variant="h5">Round Info</Typography>
                {roundScores.map((round, index) => (
                  <Typography id="round-scores" key={index} variant="body1">
                    Round {index + 1}: Score: {round.round_score}
                    <>
                      <hr />
                    </>
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
