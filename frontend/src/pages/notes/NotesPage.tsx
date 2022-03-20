import React from "react";
import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  GlobalStyles,
  Box,
  Container,
  Link,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import monthNames from "../../constants/monthNames";
import weekdays from "../../constants/weekdays";
import { getMonthDates, getIsoDateString } from "../../utils/dateHelpers";
import CalendarDay from "./CalendarDay.type";

const date: Date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();

const pageTitle = `${monthNames[currentMonth]} ${currentYear}`;
const calendarRows: CalendarDay[] = getMonthDates(
  currentYear,
  currentMonth
).map((date: Date) => {
  console.log(date.toISOString(), date.toString());

  return {
    date,
    projectName: "Project",
    description: "Lorem ipsum",
    isSaved: false,
  };
});

const NotesPage = () => {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Projects Notebook
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ m: 3 }}>
        <Typography
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {pageTitle}
        </Typography>
      </Box>

      <Box mb={3}>
        <Container maxWidth="xl" component="main">
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 100 }} align="left" padding="none">
                    Date
                  </TableCell>
                  <TableCell style={{ width: 100 }} align="left" padding="none">
                    Weekday
                  </TableCell>
                  <TableCell style={{ width: 100 }} align="left" padding="none">
                    Project
                  </TableCell>
                  <TableCell align="left" padding="none">
                    Description
                  </TableCell>
                  <TableCell
                    style={{ width: 100 }}
                    align="right"
                    padding="none"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {calendarRows.map((row) => (
                  <TableRow
                    hover
                    key={row.date.toString()}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={
                      row.date.toDateString() === new Date().toDateString()
                        ? {
                            backgroundColor: "#bdbdbd",
                          }
                        : row.date.getDay() === 0 || row.date.getDay() === 6
                        ? {
                            backgroundColor: "#e0e0e0",
                          }
                        : {
                            backgroundColor: "",
                          }
                    }
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align="left"
                      padding="none"
                    >
                      <b>{getIsoDateString(row.date)}</b>
                    </TableCell>
                    <TableCell
                      style={{ width: 100 }}
                      align="left"
                      padding="none"
                    >
                      {weekdays[row.date.getDay()]}
                    </TableCell>
                    <TableCell
                      style={{ width: 100 }}
                      align="left"
                      padding="none"
                    >
                      {row.date.getDay() === 0 || row.date.getDay() === 6
                        ? "Weekend"
                        : row.projectName}
                    </TableCell>
                    <TableCell align="left" padding="none">
                      {row.description}
                    </TableCell>
                    <TableCell
                      style={{ width: 100 }}
                      align="right"
                      padding="none"
                    >
                      {row.isSaved ? (
                        <Link href="#" underline="none">
                          Create
                        </Link>
                      ) : (
                        <Link href="#" underline="none">
                          Edit
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {/* <TableFooter>
                <TableRow>Hello</TableRow>
              </TableFooter> */}
            </Table>
          </TableContainer>
        </Container>
      </Box>

      <Box sx={{ m: 5 }}>
        <Typography
          variant="overline"
          display="block"
          align="center"
          gutterBottom
        >
          Copyright &copy; Adam Pertek 2022
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default NotesPage;
