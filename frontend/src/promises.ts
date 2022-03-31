import { API_URL } from "./constants";

export const getMonthDaysPromise = (year: number, monthNumber: number) => {
  const url = `${API_URL}/v1/calendar-day/${year}/${monthNumber}`;
  return fetch(url).then((response) => response.json());
};
