import classNames from "classnames";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useCalendar } from "../../../hooks/useCalendar";
import { useAuth } from "../../../hooks/useAuth";
import { useDate } from "../../../hooks/useDate";
import { PopupHeader } from "../PopupHeader";
import { EventTable } from "../EventTable";
import { NextEventDisplay } from "../NextEventDisplay";

export const Popup = () => {
  const { calendarApiResponse, fetchCalendar } = useCalendar();
  const { token, login } = useAuth();
  const { stringToDate, getDiff } = useDate();
  const [nextSchedule, setNextSchedule] = useState("");

  const events = calendarApiResponse?.items ? calendarApiResponse.items : [];

  useEffect(() => {
    const authAsync = async () => {
      await login();
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
      await login();
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
        {(() => {
          if (events.length === 0) {
            return <>Loading...</>; // TODO イベントが取得できなかった際の挙動を考える
          } else {
            return (
              <>
                <NextEventDisplay nextSchedule={nextSchedule} />
                <EventTable events={events} />
              </>
            );
          }
        })()}
      </main>
    </div>
  );
};
