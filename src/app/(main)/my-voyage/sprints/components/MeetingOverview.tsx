import Link from "next/link";

import Button from "@/components/Button";
import {
  ArrowUpRightIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function MeetingOverview() {
  return (
    <div className="grid grid-rows-[92px_1fr] 2xl:grid-rows-1 grid-cols-[230px_1fr] 2xl:grid-cols-[156px_1fr_230px] justify-between items-start 2xl:items-center w-full p-10 bg-base-200 rounded-2xl gap-5 xl:gap-x-10 2xl:gap-x-16 3xl:gap-x-[100px]">
      <div className="flex flex-col p-4 rounded-lg bg-base-100 gap-y-5">
        <p className="flex items-center text-base font-medium text-base-300 gap-x-2">
          <CalendarDaysIcon className="w-[15px] h-[15px]" /> Today
        </p>
        <p className="flex items-center text-base font-medium text-base-300 gap-x-2">
          <ClockIcon className="w-[15px] h-[15px]" /> 10:00 (MDT)
        </p>
      </div>
      <div className="flex flex-col w-full row-span-2 gap-y-2 2xl:row-auto">
        <h3 className="text-xl font-semibold">Sprint Planning</h3>
        <p className="text-base font-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit
          nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus
          pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla
          aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur
          id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum
          fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet
          sodales felis.
        </p>
      </div>
      <Link href="/" className="w-full">
        <Button
          className="bg-primary-content text-base-300 gap-x-[60px] w-full"
          size="lg"
        >
          Start meeting <ArrowUpRightIcon className="w-[10px] h-[10px]" />
        </Button>
      </Link>
    </div>
  );
}
