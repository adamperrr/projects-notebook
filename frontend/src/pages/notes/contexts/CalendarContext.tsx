import { createContext, useReducer, useContext, useState } from "react";
import CalendarDay, { emptyCalendarDay } from "../types/CalendarDay.type";

const CalendarContext = createContext<{
  calendar: CalendarDay[];
  setCalendar: (arg: CalendarDay[]) => void;
  calendarLoaded: boolean;
  setCalendarLoaded: (arg: boolean) => void;
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
  modalCalendarDay: CalendarDay;
  setModalCalendarDay: (arg: CalendarDay) => void;
  showSuccessModalAlert: boolean;
  setShowSuccessModalAlert: (arg: boolean) => void;
  showErrorModalAlert: boolean;
  setShowErrorModalAlert: (arg: boolean) => void;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}>({
  calendar: [],
  setCalendar: (arg) => {},
  calendarLoaded: false,
  setCalendarLoaded: (arg) => {},
  isModalOpen: false,
  setIsModalOpen: (arg: boolean) => {},
  modalCalendarDay: emptyCalendarDay,
  setModalCalendarDay: (arg: CalendarDay) => {},
  showSuccessModalAlert: false,
  setShowSuccessModalAlert: (arg: boolean) => {},
  showErrorModalAlert: false,
  setShowErrorModalAlert: (arg: boolean) => {},
  handleOpenModal: () => {},
  handleCloseModal: () => {},
});

export const CalendarProvider = ({ children }: { children: any }) => {
  const [calendar, setCalendar] = useState<CalendarDay[]>([]);
  const [calendarLoaded, setCalendarLoaded] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalCalendarDay, setModalCalendarDay] =
    useState<CalendarDay>(emptyCalendarDay);

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

  const value = {
    calendar,
    setCalendar,
    calendarLoaded,
    setCalendarLoaded,
    isModalOpen,
    setIsModalOpen,
    modalCalendarDay,
    setModalCalendarDay,
    showSuccessModalAlert,
    setShowSuccessModalAlert,
    showErrorModalAlert,
    setShowErrorModalAlert,
    handleOpenModal,
    handleCloseModal,
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
