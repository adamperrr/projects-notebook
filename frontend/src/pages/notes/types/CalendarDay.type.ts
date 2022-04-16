type CalendarDay = {
  uuid?: string;
  day: Date;
  name: string;
  description: string;
  workTime: number;
  createdAt?: Date;
  updatedAt?: Date;
  owner?: { uuid: string };
  isSaved: boolean;
};

export const emptyCalendarDay = {
  day: new Date(),
  name: "",
  description: "",
  workTime: 0,
  isSaved: false,
};

export default CalendarDay;
