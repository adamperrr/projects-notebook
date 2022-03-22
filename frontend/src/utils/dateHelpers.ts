export const getMonthDates = (year: number, monthNumber: number): Date[] => {
  const lastDayDate: Date = new Date(year, monthNumber, 0);
  const lastDay: number = lastDayDate.getDate();
  const monthIndex = monthNumber - 1;

  let dates: Date[] = [];
  for (let day = 1; day <= lastDay; day++) {
    const newDate = new Date(year, monthIndex, day);
    dates.push(newDate);
  }

  return dates;
};

export const getIsoDateString = (date: Date): string => {
  // BECAUSE: https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off

  const year = date.getFullYear().toString().padStart(4, "0");
  const monthIndex = date.getMonth();
  const month = (monthIndex + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
  // return date.toString();
};

export const isPositiveInt = (num: any) => num > 0 && num % parseInt(num) === 0;

export const getParseMonthAndYear = (
  year: any,
  month: any,
  date: Date
): [number, number] => {
  let currentYear: number =
    isPositiveInt(year) && isPositiveInt(month) ? +year : +date.getFullYear();
  let currentMonth: number =
    isPositiveInt(year) && isPositiveInt(month) ? +month : +date.getMonth() + 1;

  return [currentYear, currentMonth];
};
