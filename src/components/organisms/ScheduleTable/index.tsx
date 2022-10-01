import classNames from "classnames";
import { useDate } from "../../../hooks/useDate";
import React from "react";
import { calendarApiResponseItem } from "types";
import styles from "./index.module.scss";

type Props = {
  events: Array<calendarApiResponseItem>;
};

export const ScheduleTable = ({ events }: Props) => {
  const { extractTimeFormat } = useDate();

  return (
    <>
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
    </>
  );
};
