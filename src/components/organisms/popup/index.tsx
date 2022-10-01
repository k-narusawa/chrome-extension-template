import classNames from "classnames";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { calendarApiResponseItem } from "types";
import { useCalendar } from "../../../hooks/useCalendar";
import { useAuth } from "../../../hooks/useAuth";
import { useDate } from "../../../hooks/useDate";
import { PopupHeader } from "../popupHeader";

export const Popup = () => {
  const { calendarApiResponse, fetchCalendar } = useCalendar();
  const { token, auth } = useAuth();
  const { extractTimeFormat, stringToDate, getDiff } = useDate();
  const [nextSchedule, setNextSchedule] = useState("");

  const events = calendarApiResponse?.items ? calendarApiResponse.items : [];

  useEffect(() => {
    const authAsync = async () => {
      await auth();
    };
    const fetchCalendarAsync = async () => {
      const storage = await chrome.storage.local.get();
      const maxResultNum: string = await storage.maxResultNum;
      await fetchCalendar(token, maxResultNum);
    };
    authAsync();
    fetchCalendarAsync();
  }, [token]);

  useEffect(() => {
    const onTimeSchedules = events.filter(
      (event) =>
        event.start.dateTime && stringToDate(event.start.dateTime) > new Date()
    );
    if (onTimeSchedules && onTimeSchedules.length == 0) return;

    const latestEventStartDate = onTimeSchedules[0].start.dateTime;
    if (!latestEventStartDate) return;
    setInterval(() => {
      setNextSchedule(getDiff(stringToDate(latestEventStartDate)));
    }, 1000);
  }, [calendarApiResponse, nextSchedule]); // APIで結果が取得できてから再描画させるためにレスポンスを指定

  const reload = async () => {
    const authAsync = async () => {
      await auth();
    };
    const fetchCalendarAsync = async () => {
      const storage = await chrome.storage.local.get();
      const maxResultNum: string = await storage.maxResultNum;
      await fetchCalendar(token, maxResultNum);
    };
    authAsync();
    fetchCalendarAsync();
  };

  return (
    <div className={classNames(styles["popup-component"])}>
      <PopupHeader reload={reload} />
      <main>
        <div>
          <span id="real-time">
            <p>
              {chrome.i18n.getMessage("main_next_appointment")}
              {nextSchedule}
            </p>
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <th className={classNames(styles["start-time"])}>
                {chrome.i18n.getMessage("table_header_start")}
              </th>
              <th className={classNames(styles["title"])}>
                {chrome.i18n.getMessage("table_header_summary")}
              </th>
              <th className={classNames(styles["hang-out"])}>
                {chrome.i18n.getMessage("table_header_note")}
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event: calendarApiResponseItem) => {
              return (
                <tr key={event.id}>
                  <td className={classNames(styles["start-time-data"])}>
                    {event.start.dateTime
                      ? extractTimeFormat(event.start.dateTime)
                      : "00:00"}
                  </td>
                  <td className={classNames(styles["title-data"])}>
                    {event.summary}
                  </td>
                  <td className={classNames(styles["hang-out-data"])}>
                    {event.hangoutLink ? (
                      <a target="_blank" href={event.hangoutLink}>
                        Meet
                      </a>
                    ) : undefined}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
};
