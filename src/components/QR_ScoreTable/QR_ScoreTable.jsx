import { Table, TableBody, TableHead, TableRow } from "@mui/material";
// ~~~~~~~~~~~~~~~ Utils ~~~~~~~~~~~~~~~~~~
import { StyledTableCell, StyledTableRow } from "../Utils/helpers";

export default function QR_ScoreTable({ roundHeaders, roundScores }) {
  return (
    <div className="round-display">
      <Table sx={{ minWidth: 250 }} size="small">
        <TableHead>
          <TableRow sx={{ "&:last-child th": { border: 1 } }}>
            {roundHeaders.map((header) => (
              <StyledTableCell key={header} className="header">
                Round {header}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            {roundScores.map((score, index) => (
              <td key={index} className="score">
                {score}
              </td>
            ))}
          </StyledTableRow>
        </TableBody>
      </Table>
      {/* <CustomizedTables addRound={addRound}/> */}
    </div>
  );
}
