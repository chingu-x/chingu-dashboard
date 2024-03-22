import dayjs from "dayjs";
import React, { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import type { Event, SprintData } from "../mocks/voyageDashboardData";
// TODO: Fix the mocked types and import

import { generateDate, months } from "./utils/calendar";
import cn from "./utils/cn";
import { generateClassString } from "./utils/generateClassString";
import SprintItem from "@/components/sprintItem/SprintItem";
import Button from "@/components/Button";

interface CalendarProps {
  sprintWeek?: number;
  eventList?: Event[] | null;
  sprintRange?: SprintData | null;
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

  return (
    <div className="flex justify-center items-start h-full">
      <div className="w-[400px] p-6 h-full border-r-2">
        <div className="flex justify-center items-center">
          <div className="flex gap-10 items-center w-full justify-center relative">
            <ArrowLeftIcon
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all absolute left-[14px]"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1 className="text-2xl select-none font-semibold">
              {months[today.month()]} {today.year()}
            </h1>
            <ArrowRightIcon
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all absolute right-[14px]"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 font-semibold">
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
                className="text-center h-[52px] grid place-content-center text-sm border"
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
      <div className="w-[250px] h-full flex flex-col justify-between p-6">
        <div>
          <h1 className="text-xl font-semibold pb-3">
            {selectDate.toDate().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
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
        </div>
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
