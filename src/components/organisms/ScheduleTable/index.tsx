import classNames from "classnames";
import { useDate } from "../../../hooks/useDate";
import React from "react";
import { calendarApiResponseItem } from "types";
import styles from "./index.module.scss";
import Button from "../../atoms/Button";

type Props = {
  events: Array<calendarApiResponseItem>;
};

export const ScheduleTable = ({ events }: Props) => {
  const { extractTimeFormat } = useDate();

  return (
    <>
      <div className={classNames(styles["schedule-table-component"])}>
        <table>
          <thead>
            <tr>
              <th className={classNames(styles["start-time-head"])}>
                {chrome.i18n.getMessage("table_header_start")}
              </th>
              <th className={classNames(styles["title-head"])}>
                {chrome.i18n.getMessage("table_header_summary")}
              </th>
              <th className={classNames(styles["hang-out-head"])}>
                {chrome.i18n.getMessage("table_header_note")}
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event: calendarApiResponseItem) => {
              return (
                <tr key={event.id}>
                  <td className={classNames(styles["start-time-body"])}>
                    {event.start.dateTime
                      ? extractTimeFormat(event.start.dateTime)
                      : "00:00"}
                  </td>
                  <td className={classNames(styles["title-body"])}>
                    {event.summary}
                  </td>
                  <td className={classNames(styles["hang-out-body"])}>
                    {event.hangoutLink ? (
                      <>
                        <Button
                          onClick={() => {
                            window.open(event.hangoutLink, "_blank", "");
                          }}
                          size="small"
                          className={classNames(styles["hang-out-body-button"])}
                        >
                          Meet
                        </Button>
                      </>
                    ) : undefined}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
