import { getUnixTime, getDate } from "date-fns";
import React from "react";

type CellProps = {
  date: Date;
  currentMonth: boolean;
  today: boolean;
  cn: (...classes: string[]) => string;
  generateClassString: (
    date: Date,
    currentMonth: boolean,
    today: boolean,
  ) => string;
  setSelectDate: (value: React.SetStateAction<Date>) => void;
  children?: React.ReactNode;
};
function Cell({
  date,
  currentMonth,
  today,
  cn,
  generateClassString,
  setSelectDate,
  children,
}: CellProps) {
  return (
    <div
      key={getUnixTime(date)}
      className="relative grid h-[52px] place-content-center border border-base-100 text-center text-sm"
    >
      <h1
        className={cn(generateClassString(date, currentMonth, today))}
        onClick={() => {
          setSelectDate(date);
        }}
      >
        {getDate(date)}
      </h1>
      {children}
    </div>
  );
}

export default Cell;
