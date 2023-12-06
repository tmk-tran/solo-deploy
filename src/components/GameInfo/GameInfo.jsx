// import React from "react";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   List,
//   ListItem,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ThreeRingInfo from "../ThreeRing/ThreeRingInfo";
// import "./GameInfo.css"

// export default function GameInfo() {
//   return (
//     <>
//       <Accordion id="game-menu" style={{ width: "200px" }}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//         >
//           <Typography>Game Info</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//             <ThreeRingInfo />
//         </AccordionDetails>
//       </Accordion>
//     </>
//   );
// }

import React, { useState } from "react";
import { Box, Drawer, Button, List, Divider } from "@mui/material";
import GameHowTo from "../ThreeRing/GameHowTo";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "./GameInfo.css";

export default function GameInfo() {
  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div style={{ height: "30vh" }}></div>
      </List>
      <Divider />
      <List>
        <GameHowTo />
      </List>
      <Divider />
    </Box>
  );

  return (
    <div className="game-menu">
      <div>
        {["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button
              id="game-howto-btn"
              variant="contained"
              onClick={toggleDrawer(anchor, true)}
            >
              <HelpOutlineIcon />
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
