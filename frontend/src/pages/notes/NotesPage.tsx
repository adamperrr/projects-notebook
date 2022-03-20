import React from "react";
import {
  AppBar,
  Button,
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
  TableFooter,
} from "@mui/material";
import monthNames from "../../constants/monthNames";
import { getMonthDates } from "../../utils/getMonthDates";
import { formatDate } from "../../utils/formatDate";

type CalendarDay = { date: string; description: string; isSaved: boolean };

const date: Date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();

const pageTitle = `${monthNames[currentMonth]} ${currentYear}`;
const calendarRows: CalendarDay[] = getMonthDates(
  currentYear,
  currentMonth
).map((date: string) => ({ date, description: "Lorem ipsum", isSaved: false }));

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
                  <TableCell style={{ width: 100 }} align="left">
                    Date
                  </TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell style={{ width: 100 }} align="right">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {calendarRows.map((row) => (
                  <TableRow
                    hover
                    key={row.date}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    // style={
                    //   new Date().format("Y-m-d") === row.date
                    //     ? {
                    //         backgroundColor: "red",
                    //       }
                    //     : {
                    //         backgroundColor: "inherit",
                    //       }
                    // }
                  >
                    <TableCell component="th" scope="row">
                      <b>{row.date}</b>
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell style={{ width: 100 }} align="right">
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
