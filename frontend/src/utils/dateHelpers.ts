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
};

export const parseYearAndMonth = (
  year: string,
  month: string,
  date: Date
): [boolean, number, number, Date] => {
  const isPositiveInt = (num: any) => num > 0 && num % parseInt(num) === 0;

  const areYearAndMonthOk: boolean =
    isPositiveInt(year) &&
    isPositiveInt(month) &&
    Number(month) >= 1 &&
    Number(month) <= 12;

  const currentPageMonth: number = areYearAndMonthOk
    ? +month
    : +date.getMonth() + 1;
  const currentPageYear: number = areYearAndMonthOk
    ? +year
    : +date.getFullYear();
  const currentPageDate: Date = new Date(
    currentPageYear,
    currentPageMonth - 1,
    1
  );

  return [
    areYearAndMonthOk,
    currentPageYear,
    currentPageMonth,
    currentPageDate,
  ];
};

export const getPrevPageYearAndMonth = (date: Date): [number, number] => {
  const prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);

  return [prevMonthDate.getFullYear(), prevMonthDate.getMonth() + 1];
};

export const getNextPageYearAndMonth = (date: Date): [number, number] => {
  const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  return [nextMonthDate.getFullYear(), nextMonthDate.getMonth() + 1];
};
