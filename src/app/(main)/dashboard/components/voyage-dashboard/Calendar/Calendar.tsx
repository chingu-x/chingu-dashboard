import dayjs from "dayjs";
import React, { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import type { Event } from "../mocks/voyageDashboardData";
// TODO: Fix the mocked types and import

import { generateDate, months } from "./utils/calendar";
import cn from "./utils/cn";
import SprintItem from "@/components/sprintItem/SprintItem";
import Button from "@/components/Button";

interface CalendarProps {
  sprintWeek?: number;
  eventList?: Event[] | null;
  sprintRange?: { start: dayjs.Dayjs; end: dayjs.Dayjs };
}
export default function Calendar({
  sprintWeek = 1,
  eventList,
  sprintRange,
}: CalendarProps) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  function generateClassString(
    date: dayjs.Dayjs,
    currentMonth: boolean,
    today: boolean = false,
    selectDate: dayjs.Dayjs,
    sprintRange?: { start: dayjs.Dayjs; end: dayjs.Dayjs },
  ) {
    let classes =
      "h-[50px] w-[50px] grid place-content-center hover:bg-base-100 transition-all cursor-pointer select-none";

    const isSelectedDate =
      selectDate.toDate().toDateString() === date.toDate().toDateString();
    const isWithinSprintRange =
      sprintRange &&
      (date.isSame(sprintRange.start.startOf("day")) ||
        date.isAfter(sprintRange.start.startOf("day"))) &&
      date.isBefore(sprintRange.end.endOf("day"));

    if (!currentMonth) {
      classes += " text-gray-400";
    }

    if (isSelectedDate) {
      classes += " bg-primary text-white";
    } else if (isWithinSprintRange && !today) {
      classes += " bg-primary-content";
    }

    if (today) {
      classes += " bg-primary text-white";
    }

    return classes;
  }

  return (
    <div className="flex gap-10 justify-center items-start">
      <div className="w-[400px] p-[20px]">
        <div className="flex justify-center items-center">
          <div className="flex gap-10 items-center">
            <ArrowLeftIcon
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1 className="select-none font-semibold">
              {months[today.month()]} {today.year()}
            </h1>
            <ArrowRightIcon
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 ">
          {days.map((day) => (
            <h1
              key={day}
              className="text-sm text-center h-14 w-14 grid place-content-center text-base-300 select-none"
            >
              {day}
            </h1>
          ))}
        </div>

        <div className="grid grid-cols-7 border">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }) => (
              <div
                key={date.unix()}
                className="p-2 text-center h-[52px] grid place-content-center text-sm border-t border-l"
              >
                <h1
                  className={cn(
                    generateClassString(
                      date,
                      currentMonth,
                      today,
                      selectDate,
                      sprintRange,
                    ),
                  )}
                  onClick={() => {
                    setSelectDate(date);
                  }}
                >
                  {date.date()}
                </h1>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="w-[250px] sm:px-5">
        <h1 className="text-xl font-semibold pb-3">
          {selectDate.toDate().toDateString()}
        </h1>
        <p className="rounded-lg bg-primary-content p-3 text-base font-medium w-full">
          Sprint Week {sprintWeek}
        </p>
        {eventList?.map((event) => (
          <div key={event.title}>
            <SprintItem
              title={event.title}
              link={event.link ?? ""}
              time={event.date}
            />
          </div>
        ))}
        <Button
          className="self-end p-1 rounded text-base font-medium"
          onClick={() => {
            setToday(currentDate);
            setSelectDate(currentDate);
          }}
        >
          Today
        </Button>
      </div>
    </div>
  );
}
