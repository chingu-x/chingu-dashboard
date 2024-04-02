import { format, isSameDay, getUnixTime } from "date-fns";
import React from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { useCalendarLogic } from "./Calendar.logic";
import Cell from "./components/Cell";
import SprintItem from "./components/SprintItem";
import Dot from "./components/Dot";
import Legend from "./components/Legend";
import type { SprintData } from "@/app/(main)/dashboard/mocks/voyageDashboardData";
import Button from "@/components/Button";

interface CalendarProps {
  sprintData?: SprintData;
}
export default function Calendar({ sprintData }: CalendarProps) {
  const {
    cn,
    generateDate,
    generateClassString,
    days,
    today,
    setToday,
    selectDate,
    setSelectDate,
    currentDate,
    onArrowClick,
    currentMonth,
    currentYear,
    selectedDate,
    showDotConditions,
    showRocketIcon,
    getCalendarElementColor,
    setIsHoveredDate,
  } = useCalendarLogic(sprintData);

  return (
    <div className="flex h-full w-full">
      <div className="min-w-[400px] max-w-[400px] p-6 h-full border-r-2 border-base-100">
        <div className="flex justify-center items-center">
          <div className="flex gap-10 items-center w-full justify-center relative">
            <ArrowLeftIcon
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all absolute left-[14px]"
              onClick={() => {
                onArrowClick(-1);
              }}
            />
            <h1 className="text-2xl select-none font-semibold">
              {currentMonth} {currentYear}
            </h1>
            <ArrowRightIcon
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all absolute right-[14px]"
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

        <div className="grid grid-cols-7 border border-base-100">
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
                        color={getCalendarElementColor(date)}
                      />
                    ) : null,
                  )}
                  {showRocketIcon(date) ? (
                    <RocketLaunchIcon
                      className={`w-4 h-4 absolute left-0 right-0 bottom-[2px] m-auto ${
                        "text-" + getCalendarElementColor(date)
                      }`}
                    />
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
          {sprintData ? (
            <p className="rounded-lg bg-primary-content p-3 text-base font-medium w-full">
              Sprint Week {sprintData?.number}
            </p>
          ) : null}
          {sprintData?.eventList?.map((event) => {
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
        <Button
          className={`self-end p-1 rounded text-base font-medium hover:bg-neutral ${
            isSameDay(selectDate, currentDate)
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
