import { API_URL } from "../../../constants";
import CalendarDay from "../types/CalendarDay.type";
import { getIsoDateString } from "../../../utils/dateHelpers";

export const getMonthDaysPromise = (
  year: number,
  monthNumber: number
): Promise<Response> => {
  const url = `${API_URL}/v1/calendar-day/${year}/${monthNumber}`;
  return fetch(url).then((response) => response.json());
};

export const createDay = (calendarDay: CalendarDay): Promise<Response> => {
  const url = `${API_URL}/v1/calendar-day/`;
  const calendarDayWithOwner = {
    ...calendarDay,
    day: getIsoDateString(calendarDay.day),
    owner: { uuid: "1a9db6f9-1c4f-41c4-9030-67e3a2026d84" }, // TODO: use owner from session
    workTime: +calendarDay.workTime,
  };

  try {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(calendarDayWithOwner),
    }).then((response) => response.json());
  } catch (error) {
    throw error;
  }
};

export const editDay = (
  uuid: string,
  calendarDay: CalendarDay
): Promise<Response> => {
  const url = `${API_URL}/v1/calendar-day/${uuid}`;
  const calendarDayWithOwner = {
    ...calendarDay,
    day: getIsoDateString(calendarDay.day),
    owner: { uuid: "1a9db6f9-1c4f-41c4-9030-67e3a2026d84" }, // TODO: use owner from session
    workTime: +calendarDay.workTime,
  };

  try {
    return fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(calendarDayWithOwner),
    }).then((response) => response.json());
  } catch (error) {
    throw error;
  }
};
