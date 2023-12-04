import React from "react";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
// ~~~~~~~~~~~~~~~ Utils ~~~~~~~~~~~~~~~~~~
import { StyledTableCell, StyledTableRow } from "../Utils/helpers";

export default function RoundTable({ roundHeaders, roundScores }) {
  return (
    <Table sx={{ minWidth: 250 }} size="small">
      <TableHead>
        <TableRow sx={{ "&:last-child th": { border: 0 } }}>
          {roundHeaders.map((header) => (
            <StyledTableCell key={header} style={{ textAlign: "center" }}>
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
  );
}
