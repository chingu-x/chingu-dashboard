"use client";

import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import Stepper, { SteppersItem } from "@/components/Stepper";

export default function ProgressStepper() {
  // TODO: some logic (function) needs to be written here to change objects in the array (or create array) according to the current sprint
  const steppers = [
    {
      icon: <RocketLaunchIcon className="h-[1.125rem]" />,
      isActive: false,
      name: "Sprint 1",
      onClickEvent: () => {},
      status: "completed",
    },
    {
      icon: <RocketLaunchIcon className="h-[1.125rem]" />,
      isActive: false,
      name: "Sprint 2",
      onClickEvent: () => {},
      status: "completed",
    },
    {
      icon: <RocketLaunchIcon className="h-[1.125rem]" />,
      isActive: true,
      name: "Sprint 3",
      onClickEvent: () => {},
      status: "current",
    },
    {
      icon: <RocketLaunchIcon className="h-[1.125rem]" />,
      isActive: false,
      name: "Sprint 4",
      onClickEvent: () => {},
      status: "remaining",
    },
    {
      icon: <RocketLaunchIcon className="h-[1.125rem]" />,
      isActive: false,
      name: "Sprint 5",
      onClickEvent: () => {},
      status: "remaining",
    },
    {
      icon: <RocketLaunchIcon className="h-[1.125rem]" />,
      isActive: false,
      name: "Sprint 6",
      onClickEvent: () => {},
      status: "remaining",
    },
  ] as SteppersItem[];
  return <Stepper steppers={steppers} styleType="icons" />;
}
