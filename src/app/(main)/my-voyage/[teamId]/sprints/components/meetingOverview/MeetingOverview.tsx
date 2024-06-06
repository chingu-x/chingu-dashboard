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
    <div className="grid w-full grid-cols-[230px_1fr] grid-rows-[92px_1fr] items-start justify-between gap-5 rounded-2xl bg-base-200 p-10 xl:gap-x-10 2xl:grid-cols-[180px_1fr_230px] 2xl:grid-rows-1 2xl:items-center 2xl:gap-x-16 3xl:gap-x-[100px]">
      <div className="flex min-h-[100px] flex-col gap-y-5 rounded-lg bg-base-100 p-4 text-base font-medium capitalize text-base-300">
        <DateTimeComponent dateTime={dateTime} />
      </div>
      <div className="row-span-2 flex w-full flex-col gap-y-2 2xl:row-auto">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="whitespace-pre-wrap text-base font-medium">
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
          className="w-full justify-between bg-primary-content text-base-300 hover:text-base-200"
          size="lg"
        >
          Start meeting <ArrowUpRightIcon className="h-[20px] w-[20px]" />
        </Button>
      </a>
    </div>
  );
}
