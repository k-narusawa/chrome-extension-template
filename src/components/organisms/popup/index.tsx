import classNames from "classnames";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { calendarApiResponseItem, calendarEvent } from "types";
import { useCalendar } from "../../../hooks/useCalendar";
import { useAuth } from "../../../hooks/useAuth";
import { useDate } from "../../../hooks/useDate";
import { CachedIcon } from "../../atoms/IconButton";

export const Popup = () => {
  const { calendarApiResponse, fetchCalendar } = useCalendar();
  const { token, auth } = useAuth();
  const { extractTimeFormat } = useDate();

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
      <header>
        <div className={classNames(styles["header-wrapper"])}>
          <div id="subject" className={classNames(styles["subject"])}>
            <p>{chrome.i18n.getMessage("header_subject")}</p>
          </div>
          <ul className={classNames(styles["navi"])}>
            <li>
              <a id="reload">
                <CachedIcon onClick={reload} />
              </a>
            </li>
          </ul>
        </div>
      </header>
      <main>
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
                    {extractTimeFormat(event.start.dateTime)}
                  </td>
                  <td className={classNames(styles["title-data"])}>
                    {event.summary}
                  </td>
                  <td className={classNames(styles["hang-out-data"])}>
                    <a>{event.hangoutLink}</a>
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
