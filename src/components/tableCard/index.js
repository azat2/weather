import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";

import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import { weatherData, weatherCountries } from "../../store/selectors";
import { deleteHistoryItem } from "../../store/actions/weatherHistory";

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

function createData(date, location, temp, id) {
  return { date, location, temp, id };
}

const TableCard = ({ isLoading }) => {
  const dispatch = useDispatch();

  const history = useSelector(weatherCountries);
  const { sys: { country: currentCountryName } = {} } =
    useSelector(weatherData);

  const getRows = () =>
    history
      .filter(({ country }) => country === currentCountryName)
      .map(({ dt, name, temp, id }) =>
        createData(new Date(dt).toLocaleDateString(), name, temp, id)
      );

  return (
    <Paper sx={{ marginLeft: "15%", width: "70%" }} component={Paper}>
      <TableContainer sx={{ maxHeight: 440 }}>
        {!history.length ? (
          <StyledTableCell>No History</StyledTableCell>
        ) : (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <Typography
                  sx={{ fontSize: 20, marginLeft: "10px" }}
                  gutterBottom
                >
                  Weather History
                </Typography>
              </TableRow>
              <TableRow>
                <TableCell>Time Stamp</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Weather</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) : (
              <TableBody>
                {getRows().map(({ date, temp, location, id }) => (
                  <StyledTableRow key={id}>
                    <StyledTableCell component="th" scope="row">
                      {date}
                    </StyledTableCell>
                    <StyledTableCell>{location}</StyledTableCell>
                    <StyledTableCell>{temp} F</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        onClick={() => dispatch(deleteHistoryItem(id))}
                        sx={{ color: "black" }}
                      >
                        <DeleteIcon />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            )}
          </Table>
        )}
      </TableContainer>
    </Paper>
  );
};

export default memo(TableCard);
