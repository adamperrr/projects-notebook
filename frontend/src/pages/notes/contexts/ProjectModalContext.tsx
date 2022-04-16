import { createContext, useReducer, useContext, useState } from "react";
import CalendarDay, { emptyCalendarDay } from "../types/CalendarDay.type";

const ProjectModalContext = createContext<{
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

export const ProjectModalProvider = ({ children }: { children: any }) => {
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
    <ProjectModalContext.Provider value={value}>
      {children}
    </ProjectModalContext.Provider>
  );
};

const useProjectModal = () => {
  const context = useContext(ProjectModalContext);

  if (context === undefined) {
    throw new Error("useProjectModal must be used within ShopContext");
  }

  return context;
};

export default useProjectModal;
