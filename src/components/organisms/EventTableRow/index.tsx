import React from "react";
import { calendarApiResponseItem } from "types/data";
import styles from "./index.module.scss";
import Button from "components/atoms/Button";
import classNames from "classnames";
import { useDate } from "hooks/useDate";

type Props = {
  event: calendarApiResponseItem;
};

export const EventTableRow = ({ event }: Props) => {
  const { extractTimeFormat } = useDate();

  return (
    <>
      <tr key={event.id} className={classNames(styles["event-row-component"])}>
        <td className={classNames(styles["start-time-body"])}>
          {event.start.dateTime
            ? extractTimeFormat(event.start.dateTime)
            : "00:00"}
        </td>
        <td className={classNames(styles["title-body"])}>{event.summary}</td>
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
    </>
  );
};
