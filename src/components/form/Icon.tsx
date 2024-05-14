"use client";

import RocketLaunchIcon from "@heroicons/react/24/solid/RocketLaunchIcon";

const Colors = {
  green: "text-success",
  amber: "text-warning",
  red: "text-error",
};

interface IconProps {
  iconName: string;
  color: string;
}

export default function Icon({ iconName, color }: IconProps) {
  if (iconName.toLowerCase() === "rocket") {
    return (
      <RocketLaunchIcon
        className={`w-6 h-5 ${Colors[color as keyof typeof Colors]}`}
      />
    );
  }
}
