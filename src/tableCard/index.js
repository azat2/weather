import * as React from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { Box, LinearProgress } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import { weatherData } from "../store/selectors";

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

function createData(date: number, location: string, temp: number) {
  return { date, location, temp };
}

const TableCard = ({ isLoading }) => {
  const { dt, name, main: { temp } = {} } = useSelector(weatherData);

  const rows = [
    createData(new Date(dt).toLocaleDateString(), name, temp),
    createData(new Date(dt).toLocaleDateString(), name, temp),
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Time Stamp</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
            <StyledTableCell align="right">Weather&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
          ) : (
            rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.date}
                </StyledTableCell>
                <StyledTableCell align="right">{row.location}</StyledTableCell>
                <StyledTableCell align="right">{row.temp} F</StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCard;
