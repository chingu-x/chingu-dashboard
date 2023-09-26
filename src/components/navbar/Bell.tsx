import { BellIcon } from "@heroicons/react/20/solid";

export default function Bell({
  notificationCount,
}: {
  notificationCount: number;
}) {
  return (
    <div className="indicator">
      <span className="indicator-item badge badge-error px-1 rounded-full text-white">
        {notificationCount}
      </span>
      <BellIcon className="h-6 w-6 text-base-300 duration-200 self-center cursor-pointer" />
    </div>
  );
}
