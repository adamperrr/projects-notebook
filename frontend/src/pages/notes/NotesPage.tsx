import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import monthNames from "./constants/MonthName.enum";
import { getMonthDaysPromise } from "./promises";
import { getMonthDates, parseYearAndMonth } from "../../utils/dateHelpers";
import CalendarDay, { emptyCalendarDay } from "./types/CalendarDay.type";
import CalendarTable from "./components/CalendarTable";
import TopBar from "./components/TopBar";
import PageTitle from "./components/PageTitle";
import { CssBaseline, GlobalStyles } from "@mui/material";
import FooterButtons from "./components/FooterButtons";
import Footer from "./components/Footer";
import Weekday from "./constants/Weekday.enum";
import ProjectModificationModal from "./components/ProjectModal";

const NotesPage = () => {
  const [pageDate, setPageDate] = useState<Date>(new Date());
  const [pageTitle, setPageTitle] = useState<string>(
    `${monthNames[new Date().getMonth()]} ${new Date().getFullYear()}`
  );
  const [calendarLoaded, setCalendarLoaded] = useState<boolean>(false);
  const [calendar, setCalendar] = useState<Array<CalendarDay>>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalCalendarDay, setModalCalendarDay] =
    useState<CalendarDay>(emptyCalendarDay);

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
      .catch((err) => console.log(err));
  };
  const [showSuccessModalAlert, setShowSuccessModalAlert] =
    useState<boolean>(false);
  const [showErrorModalAlert, setShowErrorModalAlert] =
    useState<boolean>(false);
  const handleOpenModal = (): void => setIsModalOpen(true);
  const handleCloseModal = (): void => {
    setShowSuccessModalAlert(false);
    setShowErrorModalAlert(false);
    setIsModalOpen(false);
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
  }, [params.year, params.month, pageDate.toString()]);

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      <ProjectModificationModal
        isModalOpen={isModalOpen}
        modalCalendarDay={modalCalendarDay}
        setModalCalendarDay={setModalCalendarDay}
        handleCloseModal={handleCloseModal}
        showSuccessModalAlert={showSuccessModalAlert}
        setShowSuccessModalAlert={setShowSuccessModalAlert}
        showErrorModalAlert={showErrorModalAlert}
        setShowErrorModalAlert={setShowErrorModalAlert}
      />

      <TopBar />
      <PageTitle pageTitle={pageTitle} />
      <CalendarTable
        calendarLoaded={calendarLoaded}
        calendar={calendar}
        handleOpenModal={handleOpenModal}
        setModalCalendarDay={setModalCalendarDay}
      />
      <FooterButtons pageDate={pageDate} />
      <Footer />
    </React.Fragment>
  );
};

export default NotesPage;
