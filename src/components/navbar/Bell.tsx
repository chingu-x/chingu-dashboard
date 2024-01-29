import { BellIcon } from "@heroicons/react/20/solid";

export default function Bell({
  notificationCount,
}: {
  notificationCount: number | undefined;
}) {
  return (
    <div className="relative">
      <span className="absolute -top-3 -end-3 px-1 rounded-full text-white bg-red-500">
        {notificationCount}
      </span>
      <BellIcon className="h-6 w-6 text-base-300 duration-200 self-center cursor-pointer" />
    </div>
  );
}
