"use client";

import { format, isSameDay, getUnixTime } from "date-fns";
import React from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { useCalendarLogic } from "./Calendar.logic";
import Cell from "./components/Cell";
import SprintItem from "./components/SprintItem";
import Dot from "./components/Dot";
import Legend from "./components/Legend";
import { EventList } from "@/app/(main)/dashboard/components/voyage-dashboard/getDashboardData";
import Button from "@/components/Button";
import { Sprint } from "@/store/features/sprint/sprintSlice";

interface CalendarProps {
  currentSprintNumber?: number | null;
  sprintsData?: Sprint[];
  meetingsData?: EventList[];
}
export default function Calendar({
  sprintsData,
  currentSprintNumber,
  meetingsData,
}: CalendarProps) {
  const {
    cn,
    generateDate,
    generateClassString,
    days,
    today,
    setToday,
    selectDate,
    setSelectDate,
    userDate,
    onArrowClick,
    currentMonth,
    currentYear,
    selectedDate,
    showDotConditions,
    showRocketIcon,
    getCalendarElementColor,
    setIsHoveredDate,
    onDotClick,
  } = useCalendarLogic(sprintsData, currentSprintNumber, meetingsData);

  return (
    <div className="flex h-full w-full max-[1200px]:flex-col max-[1200px]:gap-y-4 max-[1200px]:items-center max-[1200px]:relative">
      <div className="min-w-[400px] max-w-[400px] p-6 h-full min-[1200px]:border-r-2 min-[1200px]:min-w-[600px] min-[1200px]:px-28 min-[1470px]:min-w-[400px] min-[1470px]:px-6 border-base-100 flex flex-col items-center">
        <div className="flex w-full items-center">
          <div className="flex gap-10 items-center w-full justify-center min-[1200px]:relative">
            <ArrowLeftIcon
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all absolute left-[14px] max-[1200px]:left-12"
              onClick={() => {
                onArrowClick(-1);
              }}
            />
            <h1 className="text-2xl select-none font-semibold">
              {currentMonth} {currentYear}
            </h1>
            <ArrowRightIcon
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all absolute right-[14px] max-[1200px]:right-12"
              onClick={() => {
                onArrowClick(1);
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

        <div className="grid grid-cols-7 border border-base-100 max-w-[352px]">
          {generateDate(today.getMonth(), today.getFullYear()).map(
            ({ date, currentMonth, today }) => (
              <div
                key={getUnixTime(date)}
                onMouseEnter={() => setIsHoveredDate(date)}
                onMouseLeave={() => setIsHoveredDate(null)}
              >
                <Cell
                  date={date}
                  currentMonth={currentMonth}
                  today={!!today}
                  cn={cn}
                  generateClassString={() =>
                    generateClassString(date, currentMonth)
                  }
                  setSelectDate={setSelectDate}
                >
                  {showDotConditions(date).map((condition) =>
                    condition.check ? (
                      <Dot
                        key={condition.id}
                        color={getCalendarElementColor(date, currentMonth)}
                        onClick={() => onDotClick(date)}
                      />
                    ) : null,
                  )}
                  {showRocketIcon(date) ? (
                    <div
                      onClick={() => {
                        setSelectDate(date);
                      }}
                    >
                      <RocketLaunchIcon
                        className={`w-4 h-4 absolute left-0 right-0 bottom-[2px] m-auto cursor-pointer ${
                          "text-" + getCalendarElementColor(date, currentMonth)
                        }`}
                      />
                    </div>
                  ) : null}
                </Cell>
              </div>
            ),
          )}
        </div>

        <Legend />
      </div>
      <div className="h-full w-full flex flex-col justify-between p-6">
        <div>
          <h1 className="text-lg font-semibold pb-3">{selectedDate}</h1>
          <div className="max-[1500px]:w-[90px] max-[1470px]:w-full">
            {currentSprintNumber ? (
              <p className="rounded-lg bg-primary-content p-3 text-base font-medium w-full">
                Sprint Week {currentSprintNumber}
              </p>
            ) : null}
            {meetingsData?.map((event) => {
              const eventDate = new Date(event.date);
              const isSelectedDate = isSameDay(selectDate, eventDate);

              return isSelectedDate ? (
                <SprintItem
                  key={event.title}
                  title={event.title}
                  link={event.link ?? ""}
                  time={format(eventDate, "h:mm a")}
                />
              ) : null;
            })}
          </div>
        </div>
        <Button
          className={`self-end p-1 h-[27px] mt-4 rounded text-base font-medium hover:bg-neutral ${
            isSameDay(selectDate, userDate) ? "bg-primary" : "bg-neutral-focus"
          }`}
          onClick={() => {
            setToday(userDate);
            setSelectDate(userDate);
          }}
        >
          Today
        </Button>
      </div>
    </div>
  );
}
