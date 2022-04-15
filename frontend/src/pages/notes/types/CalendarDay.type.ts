type CalendarDay = {
  uuid?: string;
  day: Date;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  owner?: { uuid: string };
  isSaved: boolean;
};

export const emptyCalendarDay = {
  day: new Date(),
  name: "",
  description: "",
  isSaved: false,
};

export default CalendarDay;
