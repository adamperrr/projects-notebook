import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import monthNames from "./constants/MonthName.enum";
import { getMonthDaysPromise } from "../../promises";
import { getMonthDates, parseYearAndMonth } from "../../utils/dateHelpers";
import CalendarDay, { emptyCalendarDay } from "./types/CalendarDay.type";
import CalendarTable from "./components/CalendarTable";
import TopBar from "./components/TopBar";
import PageTitle from "./components/PageTitle";
import { CssBaseline, GlobalStyles } from "@mui/material";
import FooterButtons from "./components/FooterButtons";
import Footer from "./components/Footer";
import Weekday from "./constants/Weekday.enum";

const NotesPage = () => {
  const params = useParams();
  const [pageDate, setPageDate] = useState<Date>(new Date());
  const [pageYear, setPageYear] = useState<number>(new Date().getFullYear());
  const [pageMonthNumber, setPageMonthNumber] = useState<number>(
    new Date().getMonth() + 1
  );

  const [pageTitle, setPageTitle] = useState<string>(
    `${monthNames[new Date().getMonth()]} ${new Date().getFullYear()}`
  );
  const [calendarLoaded, setCalendarLoaded] = useState<boolean>(false);
  const [calendar, setCalendar] = useState<Array<CalendarDay>>([]);

  const navigate = useNavigate();

  const generateFullCalendar = (monthDaysFromApi: any) => {
    let calendar_ = getMonthDates(pageYear, pageMonthNumber).map(
      (date: Date) => ({
        ...emptyCalendarDay,
        day: date,
        name:
          date.getDay() === Weekday.Saturday || date.getDay() === Weekday.Sunday
            ? ""
            : emptyCalendarDay.name,
        description:
          date.getDay() === Weekday.Saturday || date.getDay() === Weekday.Sunday
            ? ""
            : emptyCalendarDay.description,
      })
    );

    for (const monthDay of monthDaysFromApi) {
      const [yearNumber, monthNumber, dayNumber] = monthDay.day.split("-");
      calendar_[+dayNumber - 1] = {
        ...monthDay,
        day: new Date(+yearNumber, +monthNumber - 1, +dayNumber),
        isSaved: true,
      };
    }

    setCalendar(calendar_);
    setCalendarLoaded(true);
  };

  const loadMonthDays = () => {
    getMonthDaysPromise(pageYear, pageMonthNumber)
      .then((monthDaysFromApi) => generateFullCalendar(monthDaysFromApi))
      .catch((err) => console.log(err));
  };

  const parseParamsAndFetchData = () => {
    setCalendarLoaded(false);

    const [areYearAndMonthOk, pageYear_, pageMonthNumber_, pageDate_] =
      parseYearAndMonth(params?.year || "", params?.month || "", new Date());

    if (!areYearAndMonthOk) {
      navigate("/");
    }

    setPageDate(pageDate_);
    setPageYear(pageYear_);
    setPageMonthNumber(pageMonthNumber_);
    setPageTitle(`${monthNames[pageMonthNumber_ - 1]} ${pageYear_}`);

    loadMonthDays();
  };

  useEffect(() => {
    parseParamsAndFetchData();
  }, [params.year, params.month, pageYear, pageMonthNumber]);

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      <TopBar />
      <PageTitle pageTitle={pageTitle} />
      <CalendarTable calendarLoaded={calendarLoaded} calendar={calendar} />
      <FooterButtons pageDate={pageDate} />
      <Footer />
    </React.Fragment>
  );
};

export default NotesPage;
