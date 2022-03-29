import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import monthNames from "../../constants/monthNames";
import { getMonthDays } from "../../promises";
import { getMonthDates, parseYearAndMonth } from "../../utils/dateHelpers";
import CalendarDay, { emptyCalendarDay } from "./CalendarDay.type";

const NotesPage = () => {
  const [date] = useState(new Date());
  const [pageDate, setPageDate] = useState(new Date());
  const [pageTitle, setPageTitle] = useState(
    `${monthNames[date.getMonth()]} ${date.getFullYear()}`
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
        day: new Date(yearNumber, monthNumber - 1, dayNumber),
        isSaved: true,
      };
    }

    console.log(calendar_);
    setCalendar(calendar_);
  };

  const loadMonthDays = async () => {
    getMonthDays(pageDate.getFullYear(), pageDate.getMonth() + 1)
      .then((monthDaysFromApi) => {
        generateFullCalendar(monthDaysFromApi);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const [areYearAndMonthOk, pageDate_] = parseYearAndMonth(
      params?.year || "",
      params?.month || "",
      date
    );

    if (!areYearAndMonthOk) {
      navigate("/");
    }

    setPageDate(pageDate_);
    setPageTitle(
      `${monthNames[pageDate_.getMonth()]} ${pageDate_.getFullYear()}`
    );

    loadMonthDays();
  }, []);

  return (
    <React.Fragment>
      <h1>{pageTitle}</h1>
      <ul>
        {calendar.map(({ day, name, description, uuid }) => (
          <li>
            {day.toString()} - {name} - {description} - {uuid ? uuid : ""}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default NotesPage;
