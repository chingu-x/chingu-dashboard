import dayjs from "dayjs";
import React from "react";

type CellProps = {
  date: dayjs.Dayjs;
  currentMonth: boolean;
  today: boolean;
  cn: (...classes: string[]) => string;
  generateClassString: (
    date: dayjs.Dayjs,
    currentMonth: boolean,
    today: boolean,
  ) => string;
  setSelectDate: (value: React.SetStateAction<dayjs.Dayjs>) => void;
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
      key={date.unix()}
      className="text-center h-[52px] grid place-content-center text-sm border relative"
    >
      <h1
        className={cn(generateClassString(date, currentMonth, today))}
        onClick={() => {
          setSelectDate(date);
        }}
      >
        {date.date()}
      </h1>
      {children}
    </div>
  );
}

export default Cell;
