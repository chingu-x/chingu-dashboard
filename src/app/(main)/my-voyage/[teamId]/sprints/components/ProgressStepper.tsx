"use client";

import { useParams, useRouter } from "next/navigation";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import Stepper, { SteppersItem } from "@/components/Stepper";
import { useSprint } from "@/store/hooks";
import routePaths from "@/utils/routePaths";

function getStatus(sprintNumber: number, currentSprintNumber: number) {
  if (sprintNumber < currentSprintNumber) {
    return "completed";
  } else if (sprintNumber === currentSprintNumber) {
    return "current";
  } else {
    return "remaining";
  }
}

export default function ProgressStepper() {
  const router = useRouter();
  const params = useParams<{ teamId: string }>();
  const { currentSprintNumber, sprints } = useSprint();
  function handleClick(sprintNumber: number) {
    const meetingId = sprints.find((sprint) => sprint.number === sprintNumber)!
      .meetingData.id;
    router.push(routePaths.sprintPage(params.teamId, meetingId.toString()));
  }

  const steppers = [
    {
      icon: <RocketLaunchIcon className="h-[1.125rem]" />,
      isActive: getStatus(1, currentSprintNumber) === "current",
      name: "Sprint 1",
      onClickEvent: () => handleClick(1),
      status: getStatus(1, currentSprintNumber),
    },
    {
      icon: <RocketLaunchIcon className="h-[1.125rem]" />,
      isActive: getStatus(2, currentSprintNumber) === "current",
      name: "Sprint 2",
      onClickEvent: () => handleClick(2),
      status: getStatus(2, currentSprintNumber),
    },
    {
      icon: <RocketLaunchIcon className="h-[1.125rem]" />,
      isActive: getStatus(3, currentSprintNumber) === "current",
      name: "Sprint 3",
      onClickEvent: () => handleClick(3),
      status: getStatus(3, currentSprintNumber),
    },
    {
      icon: <RocketLaunchIcon className="h-[1.125rem]" />,
      isActive: getStatus(4, currentSprintNumber) === "current",
      name: "Sprint 4",
      onClickEvent: () => handleClick(4),
      status: getStatus(4, currentSprintNumber),
    },
    {
      icon: <RocketLaunchIcon className="h-[1.125rem]" />,
      isActive: getStatus(5, currentSprintNumber) === "current",
      name: "Sprint 5",
      onClickEvent: () => handleClick(5),
      status: getStatus(5, currentSprintNumber),
    },
    {
      icon: <RocketLaunchIcon className="h-[1.125rem]" />,
      isActive: getStatus(6, currentSprintNumber) === "current",
      name: "Sprint 6",
      onClickEvent: () => handleClick(6),
      status: getStatus(6, currentSprintNumber),
    },
  ] as SteppersItem[];
  return (
    <Stepper stepperWidth="w-full" steppers={steppers} styleType="icons" />
  );
}
