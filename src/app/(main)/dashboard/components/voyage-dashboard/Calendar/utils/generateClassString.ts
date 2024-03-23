import dayjs from "dayjs";
export function generateClassString(
  date: dayjs.Dayjs,
  currentMonth: boolean,
  today: boolean = false,
  selectDate: dayjs.Dayjs,
  startSprintDate?: dayjs.Dayjs | null,
  endSprintDate?: dayjs.Dayjs | null,
) {
  let classes =
    "h-[50px] w-[48px] grid place-content-center hover:bg-base-100 transition-all cursor-pointer select-none";

  const isSelectedDate =
    selectDate.toDate().toDateString() === date.toDate().toDateString();
  const isWithinSprintRange =
    startSprintDate &&
    endSprintDate &&
    (date.isSame(startSprintDate.startOf("day")) ||
      date.isAfter(startSprintDate.startOf("day"))) &&
    date.isBefore(endSprintDate.endOf("day"));

  if (!currentMonth) {
    classes += " text-gray-400";
  }

  if (isSelectedDate) {
    classes += " bg-primary text-white";
  } else if (isWithinSprintRange && !today) {
    classes += " bg-primary-content";
  }

  if (today) {
    classes += " bg-primary text-white";
  }

  return classes;
}
