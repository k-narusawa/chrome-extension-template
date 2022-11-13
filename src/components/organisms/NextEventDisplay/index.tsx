import classNames from "classnames";
import React from "react";
import styles from "./index.module.scss";

type Props = {
  nextSchedule: string;
};

export const NextEventDisplay = ({ nextSchedule }: Props) => {
  return (
    <>
      <div className={classNames(styles["next-schedule-display-component"])}>
        <p>
          {chrome.i18n.getMessage("main_next_appointment")}
          {nextSchedule}
        </p>
      </div>
    </>
  );
};
