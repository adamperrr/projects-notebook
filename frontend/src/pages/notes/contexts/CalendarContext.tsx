import { createContext, useReducer, useContext, useState } from "react";
import CalendarDay, { emptyCalendarDay } from "../types/CalendarDay.type";

const CalendarContext = createContext<{
  calendar: CalendarDay[];
  setCalendar: (arg: CalendarDay[]) => void;
  calendarLoaded: boolean;
  setCalendarLoaded: (arg: boolean) => void;
}>({
  calendar: [],
  setCalendar: (arg) => {},
  calendarLoaded: false,
  setCalendarLoaded: (arg) => {},
});

export const CalendarProvider = ({ children }: { children: any }) => {
  const [calendar, setCalendar] = useState<CalendarDay[]>([]);
  const [calendarLoaded, setCalendarLoaded] = useState<boolean>(false);

  const value = {
    calendar,
    setCalendar,
    calendarLoaded,
    setCalendarLoaded,
  };
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

const useCalendar = () => {
  const context = useContext(CalendarContext);

  if (context === undefined) {
    throw new Error("useCalendar must be used within ShopContext");
  }

  return context;
};

export default useCalendar;
