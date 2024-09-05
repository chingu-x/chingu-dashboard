import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { type PageProperty, type VoyagePageProperty } from "./Sidebar";
import { cn } from "@/lib/utils";

interface VoyagePageButtonProps {
  element: VoyagePageProperty;
  onClick: (element: string | PageProperty) => void;
  hoveredButton: string | null;
  selectedButton: string;
  isVoyageStarted: boolean;
  setHoveredButton: (element: string | null) => void;
}

export default function VoyagePageButton({
  element,
  onClick,
  hoveredButton,
  selectedButton,
  isVoyageStarted,
  setHoveredButton,
}: VoyagePageButtonProps) {
  const isActive =
    isVoyageStarted &&
    (hoveredButton?.startsWith(element.link) ||
      selectedButton.startsWith(element.link));

  const showIcon = () => {
    if (!isVoyageStarted) {
      return <LockClosedIcon className="mr-1 h-[1.125rem] self-center" />;
    } else if (isActive) {
      return (
        <>
          <div className="absolute left-[1.4rem] top-[3px]">
            <ArrowRightCircleIcon className="h-[1.125rem] text-primary" />
          </div>
        </>
      );
    }
  };

  return (
    <li className="h-7">
      <Link
        href={isVoyageStarted ? element.link : "#"}
        className={isVoyageStarted ? "" : "pointer-events-none"}
      >
        <button
          type="button"
          className={cn(
            "relative mb-2.5 flex h-[1.1875rem] min-h-0 w-[9.375rem] justify-start border-none bg-transparent pl-6 font-semibold capitalize text-neutral hover:bg-transparent",
            isVoyageStarted && "pl-11",
            isActive && "text-base-300",
          )}
          onMouseEnter={() => setHoveredButton(element.link)}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => isVoyageStarted && onClick(element.link)}
        >
          {showIcon()}
          {element.name}
        </button>
      </Link>
    </li>
  );
}
