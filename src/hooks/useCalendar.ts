import { useCallback, useState } from "react";
import { calendarApiResponse } from "types";
import { useDate } from "./useDate";

export const useCalendar = () => {
  const [calendarApiResponse, setSchedule] = useState<calendarApiResponse>();
  const [isLoading, setIsLoading] = useState(false)

  const fetchCalendar = useCallback(
    async (token: string, maxResults?: string) => {
      setIsLoading(true)
      const params = {
        maxResults: maxResults ? maxResults : "5",
        singleEvents: "true",
        orderBy: "startTime",
        timeMin: useDate().now(),
        timeMax: useDate().endOfToday(),
      };

      const queryParams = new URLSearchParams(params);
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?${queryParams}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            console.log(response);
          }
          return response.json();
        })
        .catch((error) => {
          console.log(error);
        });
      setIsLoading(false)
      setSchedule(response);
    },
    []
  );

  return {
    isLoading,
    fetchCalendar,
    calendarApiResponse,
  };
};
