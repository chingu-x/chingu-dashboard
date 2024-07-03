import React from "react";
import { getDate, format } from "date-fns";
import { cn } from "@/lib/utils";

type CellProps = {
  date: Date;
  setSelectedDate: (value: React.SetStateAction<Date>) => void;
  isWithinSelectedMonth: boolean;
  isWithinCurrentSprintRange?: boolean;
  isSelectedDate: boolean;
  children?: React.ReactNode;
};
function Cell({
  date,
  setSelectedDate,
  isWithinSelectedMonth,
  isWithinCurrentSprintRange,
  isSelectedDate,
  children,
}: CellProps) {
  return (
    <button
      type="button"
      className="relative grid h-[52px] place-content-center border border-base-100 text-center text-sm"
      aria-label={format(date, "MMMM do, yyyy")}
    >
      <h1
        className={cn(
          "grid h-[50px] w-[48px] cursor-pointer select-none place-content-center bg-base-content text-neutral-content",
          isWithinSelectedMonth && "bg-base-200 text-base-300",
          isWithinCurrentSprintRange && "bg-primary-content",
          isSelectedDate && "bg-primary text-base-200",
        )}
        onClick={() => {
          setSelectedDate(date);
        }}
      >
        {getDate(date)}
      </h1>
      {children}
    </button>
  );
}

export default Cell;
