import * as React from "react";
import { useSelector } from "react-redux";

import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import { Box, LinearProgress, Typography } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import { weatherData, weatherCountries } from "../../store/selectors";

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
  const history = useSelector(weatherCountries);
  const { sys: { country: currentCountryName } = {} } =
    useSelector(weatherData);

  const getRows = () =>
    history
      .filter(({ country }) => country === currentCountryName)
      .map(({ dt, name, temp }) =>
        createData(new Date(dt).toLocaleDateString(), name, temp)
      );

  return (
    <TableContainer component={Paper}>
      <Typography sx={{ fontSize: 20 }} gutterBottom>
        Weather History
      </Typography>
      {isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {!history.length ? (
                <StyledTableCell>No History</StyledTableCell>
              ) : (
                [
                  <StyledTableCell key="Time">Time Stamp</StyledTableCell>,
                  <StyledTableCell key="Location" align="right">
                    Location
                  </StyledTableCell>,
                  <StyledTableCell key="Weather" align="right">
                    Weather&nbsp;(g)
                  </StyledTableCell>,
                ]
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {getRows().map(({ date, temp , location}, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {date}
                </StyledTableCell>
                <StyledTableCell align="right">{location}</StyledTableCell>
                <StyledTableCell align="right">{temp} F</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default TableCard;
