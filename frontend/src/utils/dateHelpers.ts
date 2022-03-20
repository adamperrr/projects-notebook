export const getMonthDates = (year: number, month: number): Date[] => {
  const lastDayDate: Date = new Date(year, month + 1, 0);
  const lastDay: number = lastDayDate.getDate();

  let dates: Date[] = [];
  for (let day = 1; day <= lastDay; day++) {
    const newDate = new Date(year, month, day);
    dates.push(newDate);
  }

  return dates;
};

export const getIsoDateString = (date: Date): string => {
  // BECAUSE: https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off

  const year = date.getFullYear().toString().padStart(4, "0");
  const month = date.getMonth().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};
