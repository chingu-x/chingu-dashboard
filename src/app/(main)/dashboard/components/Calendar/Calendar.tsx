import dayjs from "dayjs";
import React from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useCalendarLogic } from "./Calendar.logic";
import type { SprintData } from "@/app/(main)/dashboard/mocks/voyageDashboardData";
import SprintItem from "@/components/sprintItem/SprintItem";
import Button from "@/components/Button";
import Dot from "@/components/Dot";

interface CalendarProps {
  sprintData?: SprintData | null;
}
export default function Calendar({ sprintData }: CalendarProps) {
  const {
    cn,
    generateDate,
    months,
    generateClassString,
    days,
    today,
    setToday,
    selectDate,
    setSelectDate,
    currentDate,
  } = useCalendarLogic();

  return (
    <div className="flex h-full w-full">
      <div className="min-w-[400px] max-w-[400px] p-6 h-full border-r-2">
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
                className="text-center h-[52px] grid place-content-center text-sm border relative"
              >
                <h1
                  className={cn(
                    generateClassString(
                      date,
                      currentMonth,
                      today,
                      selectDate,
                      sprintData?.startDate,
                      sprintData?.endDate,
                    ),
                  )}
                  onClick={() => {
                    setSelectDate(date);
                  }}
                >
                  {date.date()}
                </h1>
                {sprintData?.startDate.isSame(date, "day") && (
                  <Dot color="bg-success" />
                )}
                {sprintData?.eventList?.some((event) =>
                  dayjs(event.date, "YYYY-MM-DD h:mm A").isSame(date, "day"),
                ) && <Dot />}
              </div>
            ),
          )}
        </div>
      </div>
      <div className="h-full w-full flex flex-col justify-between p-6">
        <div>
          <h1 className="text-xl font-semibold pb-3">
            {selectDate.toDate().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h1>
          {sprintData !== null ? (
            <p className="rounded-lg bg-primary-content p-3 text-base font-medium w-full">
              Sprint Week {sprintData?.number}
            </p>
          ) : null}
          {sprintData?.eventList?.map((event) => {
            const eventDate = dayjs(event.date, "YYYY-MM-DD h:mm A");
            const isSelectedDate = selectDate.isSame(eventDate, "day");

            return isSelectedDate ? (
              <div key={event.title}>
                <SprintItem
                  title={event.title}
                  link={event.link ?? ""}
                  time={eventDate.format("h:mm A")}
                />
              </div>
            ) : null;
          })}
        </div>
        <Button
          className={`self-end p-1 rounded text-base font-medium hover:bg-neutral ${
            selectDate.isSame(currentDate, "day")
              ? "bg-primary"
              : "bg-neutral-focus"
          }`}
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
