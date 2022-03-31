import React from "react";
import {
  Box,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  Grid,
  CircularProgress,
} from "@mui/material";
import CalendarDay from "../types/CalendarDay.type";
import { getIsoDateString } from "../../../utils/dateHelpers";
import weekdays from "../constants/weekdays";

const CalendarTable = ({
  calendarLoaded,
  calendar,
}: {
  calendarLoaded: boolean;
  calendar: CalendarDay[];
}) => {
  return (
    <React.Fragment>
      {!calendarLoaded && (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}

      {calendarLoaded && (
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
                    <TableCell
                      style={{ width: 100 }}
                      align="left"
                      padding="normal"
                    >
                      Date
                    </TableCell>
                    <TableCell
                      style={{ width: 100 }}
                      align="left"
                      padding="normal"
                    >
                      Weekday
                    </TableCell>
                    <TableCell
                      style={{ width: 175 }}
                      align="left"
                      padding="normal"
                    >
                      Project
                    </TableCell>
                    <TableCell align="left" padding="normal">
                      Description
                    </TableCell>
                    <TableCell
                      style={{ width: 100 }}
                      align="right"
                      padding="normal"
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {calendar.map(
                    ({ day, name, description, isSaved }: CalendarDay) => (
                      <TableRow
                        hover
                        key={day.toString()}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        style={
                          day.toDateString() === new Date().toDateString()
                            ? {
                                backgroundColor: "#bdbdbd",
                              }
                            : day.getDay() === 0 || day.getDay() === 6
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
                          padding="normal"
                        >
                          <b>{getIsoDateString(day)}</b>
                        </TableCell>
                        <TableCell
                          style={{ width: 100 }}
                          align="left"
                          padding="normal"
                        >
                          {weekdays[day.getDay()]}
                        </TableCell>
                        <TableCell
                          style={{ width: 175 }}
                          align="left"
                          padding="normal"
                        >
                          {day.getDay() === 0 || day.getDay() === 6
                            ? "Weekend"
                            : name}
                        </TableCell>
                        <TableCell align="left" padding="normal">
                          {description}
                        </TableCell>
                        <TableCell
                          style={{ width: 100 }}
                          align="right"
                          padding="normal"
                        >
                          {isSaved ? (
                            <Link href="#" underline="none">
                              Edit
                            </Link>
                          ) : (
                            <Link href="#" underline="none">
                              Create
                            </Link>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
      )}
    </React.Fragment>
  );
};

export default CalendarTable;
