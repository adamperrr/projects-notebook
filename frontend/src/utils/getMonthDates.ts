export function getMonthDates(year: number, month: number): string[] {
  const yearString: string = String(year).padStart(4, "0");
  const monthString: string = String(month).padStart(2, "0");

  const lastDayDate: Date = new Date(year, month + 1, 0);
  const lastDay: number = lastDayDate.getDate();

  let dates: string[] = [];
  for (let day = 1; day <= lastDay; day++) {
    const dayString: string = String(day).padStart(2, "0");

    dates.push(`${yearString}-${monthString}-${dayString}`);
  }

  return dates;
}
