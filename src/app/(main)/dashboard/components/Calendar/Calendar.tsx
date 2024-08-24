"use client";

import { format, isSameDay, getUnixTime, getMonth, getYear } from "date-fns";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import { useCalendarLogic } from "./Calendar.logic";
import { useEventsLogic } from "./Events.logic";
import Cell from "./components/Cell";
import EventItem from "./components/EventItem";
import Legend from "./components/Legend";
import type { Event } from "@/dashboard/components/voyage-dashboard/getDashboardData";
import Button from "@/components/Button";
import type { Sprint } from "@/store/features/sprint/sprintSlice";

interface CalendarProps {
  currentSprintNumber?: number | null;
  sprintsData?: Sprint[];
  meetingsData?: Event[];
  voyageNumber?: number | null;
  teamId?: string;
}
export default function Calendar({
  sprintsData,
  currentSprintNumber,
  meetingsData,
  voyageNumber,
  teamId,
}: CalendarProps) {
  const {
    generateDates,
    weekdays,
    today,
    date,
    setDate,
    selectedDate,
    setSelectedDate,
    onArrowClick,
  } = useCalendarLogic();
  const { isWithinSprintRange, getEvents } = useEventsLogic(
    selectedDate,
    sprintsData,
    currentSprintNumber,
    meetingsData,
    voyageNumber,
    teamId,
  );

  return (
    <div className="flex h-full w-full max-[1200px]:relative max-[1200px]:flex-col max-[1200px]:items-center max-[1200px]:gap-y-4">
      {/* CALENDAR */}
      <div className="flex h-full min-w-[400px] max-w-[400px] flex-col items-center border-base-100 p-6 min-[1200px]:min-w-[600px] min-[1200px]:border-r-2 min-[1200px]:px-28 min-[1470px]:min-w-[400px] min-[1470px]:px-6">
        <div className="flex w-full items-center">
          <div className="flex w-full items-center justify-between min-[1200px]:relative">
            {/* CALENDAR CONTROLS */}
            <button
              type="button"
              aria-label="previous month"
              className="rounded-md p-3 transition-all hover:bg-base-content"
              onClick={() => {
                onArrowClick(-1);
              }}
            >
              <ArrowLeftIcon
                aria-hidden="true"
                className="h-5 w-5 text-base-300"
              />
            </button>
            <h1 className="select-none text-2xl font-semibold">
              {format(date, "MMMM y")}
            </h1>
            <button
              type="button"
              aria-label="next month"
              className="rounded-md p-3 transition-all hover:bg-base-content"
              onClick={() => {
                onArrowClick(1);
              }}
            >
              <ArrowRightIcon
                aria-hidden="true"
                className="h-5 w-5 text-base-300"
              />
            </button>
          </div>
        </div>
        {/* CALENDAR WEEKDAYS */}
        <div className="grid grid-cols-7 font-semibold">
          {weekdays.map((weekday) => (
            <span
              key={weekday}
              className="grid h-14 w-14 select-none place-content-center text-center text-sm text-base-300"
            >
              {weekday}
            </span>
          ))}
        </div>
        {/* CALENDAR GRID */}
        <div className="grid max-w-[352px] grid-cols-7 border border-base-100">
          {generateDates(getMonth(date), getYear(date)).map(
            ({ date, isWithinSelectedMonth }) => (
              <button
                key={getUnixTime(date)}
                type="button"
                aria-label={format(date, "MMMM do, yyyy")}
                onClick={() => {
                  setSelectedDate(date);
                }}
              >
                <Cell
                  date={date}
                  isWithinSelectedMonth={isWithinSelectedMonth}
                  isWithinCurrentSprintRange={isWithinSprintRange(date)}
                  isSelectedDate={isSameDay(selectedDate, date)}
                  events={getEvents(date)}
                />
              </button>
            ),
          )}
        </div>
        <Legend />
      </div>

      {/* LIST OF EVENTS */}
      <div className="flex h-full w-full flex-col justify-between p-6">
        <div>
          <h1 className="pb-3 text-lg font-semibold">
            {format(selectedDate, "EEEE, MMMM do")}
          </h1>
          <div className="max-[1500px]:w-[90px] max-[1470px]:w-full">
            {getEvents(selectedDate).map((event) => (
              <EventItem
                key={event.id}
                title={event.meeting?.title ?? event.label}
                link={event.meeting?.link ?? event.link}
                time={event.meeting?.date}
                useTargetBlank={!!event.meeting}
                isDisabled={event?.isDisabled}
              />
            ))}
          </div>
        </div>
        <Button
          className={`mt-4 h-[27px] self-end rounded p-1 text-base font-medium hover:bg-neutral ${
            isSameDay(selectedDate, today) ? "bg-primary" : "bg-neutral-focus"
          }`}
          onClick={() => {
            setDate(today);
            setSelectedDate(today);
          }}
        >
          Today
        </Button>
      </div>
    </div>
  );
}
