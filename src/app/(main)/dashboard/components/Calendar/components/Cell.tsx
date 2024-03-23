import dayjs from "dayjs";
import React from "react";
import Dot from "@/components/Dot";
import type { SprintData } from "@/app/(main)/dashboard/mocks/voyageDashboardData";

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
  sprintData?: SprintData | null;
};
function Cell({
  date,
  currentMonth,
  today,
  cn,
  generateClassString,
  setSelectDate,
  sprintData,
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
      {sprintData?.startDate.isSame(date, "day") && <Dot color="bg-success" />}
      {sprintData?.eventList?.some((event) =>
        dayjs(event.date, "YYYY-MM-DD h:mm A").isSame(date, "day"),
      ) && <Dot />}
    </div>
  );
}

export default Cell;
