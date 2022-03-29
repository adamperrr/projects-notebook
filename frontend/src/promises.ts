import { API_URL } from "./constants";

export const getMonthDays = (year: number, month: number) => {
  const url = `${API_URL}/v1/calendar-day/${year}/${month}`;
  return fetch(url).then((res) => res.json());
};
