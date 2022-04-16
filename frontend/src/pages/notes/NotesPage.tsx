import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import monthNames from "./constants/MonthName.enum";
import { getMonthDaysPromise } from "./utils/promises";
import { getMonthDates, parseYearAndMonth } from "../../utils/dateHelpers";
import { emptyCalendarDay } from "./types/CalendarDay.type";
import CalendarTable from "./components/CalendarTable";
import TopBar from "./components/TopBar";
import PageTitle from "./components/PageTitle";
import { CssBaseline, GlobalStyles } from "@mui/material";
import FooterButtons from "./components/FooterButtons";
import Footer from "./components/Footer";
import Weekday from "./constants/Weekday.enum";
import ProjectModal from "./components/ProjectModal";
import useCalendar from "./contexts/CalendarContext";
import useProjectModal from "./contexts/ProjectModalContext";

const NotesPage = () => {
  const { setCalendar, setCalendarLoaded } = useCalendar();
  const { isModalOpen } = useProjectModal();

  const [pageDate, setPageDate] = useState<Date>(new Date());
  const [pageTitle, setPageTitle] = useState<string>(
    `${monthNames[new Date().getMonth()]} ${new Date().getFullYear()}`
  );

  const params = useParams();
  const navigate = useNavigate();

  const generateFullCalendar = (monthDaysFromApi: any): void => {
    let calendar_ = getMonthDates(
      pageDate.getFullYear(),
      pageDate.getMonth() + 1
    ).map((date: Date) => ({
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
    }));

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
  const loadMonthDays = (): void => {
    getMonthDaysPromise(pageDate.getFullYear(), pageDate.getMonth() + 1)
      .then((monthDaysFromApi) => generateFullCalendar(monthDaysFromApi))
      .catch((err) => console.log(`[NotesPage - loadMonthDays]`, err));
  };

  useEffect(() => {
    setCalendarLoaded(false);

    const [areYearAndMonthOk, pageYear_, pageMonthNumber_, pageDate_] =
      parseYearAndMonth(params?.year || "", params?.month || "", new Date());

    if (!areYearAndMonthOk) {
      navigate("/");
    }

    setPageDate(pageDate_);
    setPageTitle(`${monthNames[pageMonthNumber_ - 1]} ${pageYear_}`);

    loadMonthDays();
  }, [params.year, params.month, pageDate.toString(), isModalOpen]);

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      <ProjectModal />

      <TopBar />
      <PageTitle pageTitle={pageTitle} />
      <CalendarTable />
      <FooterButtons pageDate={pageDate} />
      <Footer />
    </React.Fragment>
  );
};

export default NotesPage;
