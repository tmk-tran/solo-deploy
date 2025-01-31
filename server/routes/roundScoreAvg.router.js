const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * Retrieve the average round score data of games played by a specific user using USER_ID
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT g.game_id,
      AVG(r.round_score) AS average_round_score
    FROM games g
    JOIN rounds r ON g.game_id = r.game_id
    WHERE g.user_id = $1
    GROUP BY g.game_id;
  `;

  pool
    .query(queryText, [req.user.user_id])
    .then((result) => {
      console.log("FROM roundScoreAvg.router: ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in the GET / request for AVG roundScore data", err);
      res.sendStatus(500);
    });
});

module.exports = router;
