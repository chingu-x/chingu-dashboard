import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

import DateTimeComponent from "./DateTimeComponent";
import Button from "@/components/Button";

interface MeetingOverviewProps {
  title: string;
  dateTime: string;
  meetingLink: string;
  description: string;
}

export default function MeetingOverview({
  title,
  dateTime,
  meetingLink,
  description,
}: MeetingOverviewProps) {
  return (
    <div className="grid grid-rows-[92px_1fr] 2xl:grid-rows-1 grid-cols-[230px_1fr] 2xl:grid-cols-[180px_1fr_230px] justify-between items-start 2xl:items-center w-full p-10 bg-base-200 rounded-2xl gap-5 xl:gap-x-10 2xl:gap-x-16 3xl:gap-x-[100px]">
      <div className="min-h-[100px] flex flex-col p-4 text-base font-medium capitalize rounded-lg bg-base-100 gap-y-5 text-base-300">
        <DateTimeComponent dateTime={dateTime} />
      </div>
      <div className="flex flex-col w-full row-span-2 gap-y-2 2xl:row-auto">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-base font-medium whitespace-pre-wrap">
          {description}
        </p>
      </div>
      <a
        href={`//${meetingLink}`}
        target={"_blank"}
        rel={"noreferrer"}
        className="w-full"
      >
        <Button
          className="justify-between w-full bg-primary-content text-base-300 hover:text-base-200 "
          size="lg"
        >
          Start meeting <ArrowUpRightIcon className="w-[20px] h-[20px]" />
        </Button>
      </a>
    </div>
  );
}
