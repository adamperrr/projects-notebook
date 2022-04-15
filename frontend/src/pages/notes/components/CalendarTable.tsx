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
import Weekday from "../constants/Weekday.enum";
import useCalendar from "../contexts/CalendarContext";

const CalendarTable = () => {
  const { calendar, calendarLoaded, handleOpenModal, setModalCalendarDay } =
    useCalendar();

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
                      style={{ width: 250 }}
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
                  {calendar.map((calendarDay: CalendarDay) => (
                    <TableRow
                      hover
                      key={calendarDay.day.toString()}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      style={
                        calendarDay.day.toDateString() ===
                        new Date().toDateString()
                          ? {
                              backgroundColor: "#bdbdbd",
                              borderTop: "3px solid #7d7c7c",
                              borderBottom: "3px solid #7d7c7c",
                            }
                          : calendarDay.day.getDay() === Weekday.Saturday ||
                            calendarDay.day.getDay() === Weekday.Sunday
                          ? {
                              backgroundColor: "#e0e0e0",
                            }
                          : {}
                      }
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align="left"
                        padding="normal"
                      >
                        <b>{getIsoDateString(calendarDay.day)}</b>
                      </TableCell>
                      <TableCell
                        style={{ width: 100 }}
                        align="left"
                        padding="normal"
                      >
                        {Weekday[calendarDay.day.getDay()]}
                      </TableCell>
                      <TableCell
                        style={{ width: 250 }}
                        align="left"
                        padding="normal"
                      >
                        {calendarDay.day.getDay() === Weekday.Saturday ||
                        calendarDay.day.getDay() === Weekday.Sunday ? (
                          calendarDay.name ? (
                            <b>Weekend | {calendarDay.name}</b>
                          ) : (
                            <b>Weekend</b>
                          )
                        ) : (
                          calendarDay.name
                        )}
                      </TableCell>
                      <TableCell align="left" padding="normal">
                        {calendarDay.description}
                      </TableCell>
                      <TableCell
                        style={{ width: 100 }}
                        align="right"
                        padding="normal"
                      >
                        {calendarDay.isSaved ? (
                          <Link
                            href="#"
                            onClick={() => {
                              handleOpenModal();
                              setModalCalendarDay(calendarDay);
                            }}
                            underline="none"
                          >
                            Edit
                          </Link>
                        ) : (
                          <Link
                            href="#"
                            onClick={() => {
                              handleOpenModal();
                              setModalCalendarDay(calendarDay);
                            }}
                            underline="none"
                          >
                            Create
                          </Link>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
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
