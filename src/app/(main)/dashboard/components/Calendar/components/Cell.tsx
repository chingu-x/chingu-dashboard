import { getDate } from "date-fns";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { type Event } from "@/dashboard/components/Calendar/types/types";

type CellProps = {
  date: Date;
  isWithinSelectedMonth: boolean;
  isWithinCurrentSprintRange?: boolean;
  isSelectedDate: boolean;
  events: Event[];
};

function Cell({
  date,
  isWithinSelectedMonth,
  isWithinCurrentSprintRange,
  isSelectedDate,
  events,
}: CellProps) {
  const showDot = events.find((event) => event.check && event.showDot);
  const showRocket = events.find((event) => event.check && event.showRocket);

  return (
    <div
      className={cn(
        "group relative grid h-[50px] w-[48px] cursor-pointer select-none place-content-center border border-base-100 bg-base-content text-center text-sm text-neutral-content hover:bg-base-100",
        isWithinSelectedMonth && "bg-base-200 text-base-300",
        isWithinCurrentSprintRange && "bg-primary-content",
        isSelectedDate && "bg-primary text-base-200 hover:bg-primary",
      )}
    >
      <h1>{getDate(date)}</h1>
      {showDot && (
        <div
          className={cn(
            "absolute inset-x-0 bottom-[6px] m-auto h-2 w-2 rounded-full bg-neutral-content group-hover:bg-neutral-content",
            isWithinSelectedMonth && "bg-neutral-focus group-hover:bg-neutral",
            isSelectedDate && "bg-base-200 group-hover:bg-base-200",
          )}
        />
      )}
      {showRocket && (
        <RocketLaunchIcon
          className={cn(
            "absolute inset-x-0 top-px m-auto h-4 w-4 text-neutral-content group-hover:text-neutral-content",
            isWithinSelectedMonth &&
              "text-neutral-focus group-hover:text-neutral",
            isSelectedDate && "text-base-200 group-hover:text-base-200",
          )}
        />
      )}
    </div>
  );
}

export default Cell;
