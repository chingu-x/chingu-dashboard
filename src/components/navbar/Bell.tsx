import { BellIcon } from "@heroicons/react/20/solid";

export default function Bell({
  notificationCount,
}: {
  notificationCount: number | undefined;
}) {
  return (
    <div className="relative">
      <span className="absolute -end-3 -top-3 rounded-full bg-red-500 px-1 text-white">
        {notificationCount}
      </span>
      <BellIcon className="h-6 w-6 cursor-pointer self-center text-base-300 duration-200" />
    </div>
  );
}
