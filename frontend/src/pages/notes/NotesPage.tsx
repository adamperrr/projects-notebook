import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import monthNames from "./constants/monthNames";
import { getMonthDays } from "../../promises";
import { getMonthDates, parseYearAndMonth } from "../../utils/dateHelpers";
import CalendarDay, { emptyCalendarDay } from "./types/CalendarDay.type";
import CalendarTable from "./components/CalendarTable";
import TopBar from "./components/TopBar";
import PageTitle from "./components/PageTitle";
import { CssBaseline, GlobalStyles } from "@mui/material";
import FooterButtons from "./components/FooterButtons";
import Footer from "./components/Footer";

const NotesPage = () => {
  const [pageDate, setPageDate] = useState<Date>(new Date());
  const [pageTitle, setPageTitle] = useState<string>(
    `${monthNames[new Date().getMonth()]} ${new Date().getFullYear()}`
  );
  const [calendar, setCalendar] = useState<Array<CalendarDay>>([]);

  const params = useParams();
  const navigate = useNavigate();

  const generateFullCalendar = (monthDaysFromApi: any) => {
    let calendar_ = getMonthDates(
      pageDate.getFullYear(),
      pageDate.getMonth() + 1
    ).map((date: Date) => ({ ...emptyCalendarDay, day: date }));

    for (const monthDay of monthDaysFromApi) {
      const [yearNumber, monthNumber, dayNumber] = monthDay.day.split("-");
      calendar_[+dayNumber - 1] = {
        ...monthDay,
        day: new Date(+yearNumber, +monthNumber - 1, +dayNumber),
        isSaved: true,
      };
    }

    setCalendar(calendar_);
  };

  const loadMonthDays = async () => {
    getMonthDays(pageDate.getFullYear(), pageDate.getMonth())
      .then((monthDaysFromApi) => generateFullCalendar(monthDaysFromApi))
      .catch((err) => console.log(err));
  };

  const parseParamsAndFetchData = () => {
    const [areYearAndMonthOk, pageDate_] = parseYearAndMonth(
      params?.year || "",
      params?.month || "",
      new Date()
    );

    if (!areYearAndMonthOk) {
      navigate("/");
    }

    setPageDate(pageDate_);
    setPageTitle(
      `${monthNames[pageDate_.getMonth()]} ${pageDate_.getFullYear()}`
    );

    loadMonthDays();
  };

  useEffect(() => {
    parseParamsAndFetchData();
  }, []);

  useEffect(() => {
    parseParamsAndFetchData();
  }, [params]);

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      <TopBar />
      <PageTitle pageTitle={pageTitle} />
      <CalendarTable calendar={calendar} />
      <FooterButtons pageDate={pageDate} />
      <Footer />
    </React.Fragment>
  );
};

export default NotesPage;
