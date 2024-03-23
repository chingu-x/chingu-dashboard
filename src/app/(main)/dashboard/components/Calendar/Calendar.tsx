import dayjs from "dayjs";
import React from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useCalendarLogic } from "./Calendar.logic";
import Cell from "./components/Cell";
import SprintItem from "./components/SprintItem";
import Dot from "./components/Dot";
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
  } = useCalendarLogic(sprintData);

  return (
    <div className="flex h-full w-full">
      <div className="min-w-[400px] max-w-[400px] p-6 h-full border-r-2">
        <div className="flex justify-center items-center">
          <div className="flex gap-10 items-center w-full justify-center relative">
            <ArrowLeftIcon
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all absolute left-[14px]"
              onClick={() => {
                onArrowClick(today.month() - 1);
              }}
            />
            <h1 className="text-2xl select-none font-semibold">
              {currentMonth} {currentYear}
            </h1>
            <ArrowRightIcon
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all absolute right-[14px]"
              onClick={() => {
                onArrowClick(today.month() + 1);
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
              <Cell
                key={date.unix()}
                date={date}
                currentMonth={currentMonth}
                today={!!today}
                cn={cn}
                generateClassString={() =>
                  generateClassString(date, currentMonth, today)
                }
                setSelectDate={setSelectDate}
              >
                {showDotConditions(date).map((condition) =>
                  condition.check ? (
                    <Dot key={condition.id} color={condition.color} />
                  ) : null,
                )}
              </Cell>
            ),
          )}
        </div>
      </div>
      <div className="h-full w-full flex flex-col justify-between p-6">
        <div>
          <h1 className="text-xl font-semibold pb-3">{selectedDate}</h1>
          {sprintData ? (
            <p className="rounded-lg bg-primary-content p-3 text-base font-medium w-full">
              Sprint Week {sprintData?.number}
            </p>
          ) : null}
          {sprintData?.eventList?.map((event) => {
            const eventDate = dayjs(event.date, "YYYY-MM-DD h:mm A");
            const isSelectedDate = selectDate.isSame(eventDate, "day");

            return isSelectedDate ? (
              <SprintItem
                key={event.title}
                title={event.title}
                link={event.link ?? ""}
                time={eventDate.format("h:mm A")}
              />
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
