import classNames from "classnames";
import { useDate } from "hooks/useDate";
import React from "react";
import { calendarApiResponseItem } from "types";
import styles from "./index.module.scss";
import Button from "components/atoms/Button";
import { EventTableRow } from "../EventTableRow";

type Props = {
  events: Array<calendarApiResponseItem>;
};

export const EventTable = ({ events }: Props) => {
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
              return <EventTableRow key={event.id} event={event} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
