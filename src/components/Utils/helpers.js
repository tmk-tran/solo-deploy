import {
  TableRow,
  TableCell,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

// Styling for Rounds Table
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  // "&:last-child td, &:last-child th": {
  //   border: 0,
  // },
  // "&:last-child": {
  //   borderBottom: '1px solid white', // Add a border to the last row
  // },
}));

// Format the date to mm/dd/yyyy
export function formatDate(inputDate) {
  const date = new Date(inputDate);
  return date.toLocaleDateString("en-US");
}

// Icon for GameMenu
export const buttonLabel = <QueryStatsIcon />;