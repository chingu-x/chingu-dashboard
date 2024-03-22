import dayjs from "dayjs";

export function generateClassString(
  date: dayjs.Dayjs,
  currentMonth: boolean,
  today: boolean = false,
  selectDate: dayjs.Dayjs,
  sprintRange?: { start: dayjs.Dayjs; end: dayjs.Dayjs },
) {
  let classes =
    "h-[50px] w-[48px] grid place-content-center hover:bg-base-100 transition-all cursor-pointer select-none";

  const isSelectedDate =
    selectDate.toDate().toDateString() === date.toDate().toDateString();
  const isWithinSprintRange =
    sprintRange &&
    (date.isSame(sprintRange.start.startOf("day")) ||
      date.isAfter(sprintRange.start.startOf("day"))) &&
    date.isBefore(sprintRange.end.endOf("day"));

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
