type CalendarDay = {
  uuid?: string;
  day: Date;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  isSaved: boolean;
};

export const emptyCalendarDay = {
  day: new Date(),
  name: "Project",
  description: "Lorem ipsum",
  isSaved: false,
};

export default CalendarDay;
