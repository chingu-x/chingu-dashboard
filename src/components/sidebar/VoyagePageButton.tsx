import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Button } from "@/components";

interface VoyagePageButtonProps {
  element: string;
  onClick: (element: string) => void;
  hoveredButton: string | null;
  selectedButton: string;
  isVoyageStarted: boolean;
  setHoveredButton: (element: string | null) => void;
  link: string;
}

export default function VoyagePageButton({
  element,
  onClick,
  hoveredButton,
  selectedButton,
  isVoyageStarted,
  setHoveredButton,
  link
}: VoyagePageButtonProps) {
  const showIcon = (element: string) => {
    if (!isVoyageStarted) {
      return <LockClosedIcon className="h-[1.125rem]" />;
    } else if (
      isVoyageStarted &&
      (hoveredButton === element || selectedButton === element)
    ) {
      return (
        <div className="absolute left-[1.4rem]">
          <ArrowRightCircleIcon className="h-[1.125rem] text-primary" />
        </div>
      );
    }
  };

  return (
    <li className="h-7">
      <Link href={link}>
        <Button
          title={element}
          customClassName={`bg-transparent hover:bg-transparent w-[9.375rem] h-[1.1875rem] min-h-0 mb-2.5 flex justify-start ${
            isVoyageStarted ? "pl-11" : "pl-6"
          } text-neutral-focus capitalize border-none relative`}
          onMouseEnter={() => setHoveredButton(element)}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => isVoyageStarted && onClick(element)}
        >
          {showIcon(element)}
          {element}
        </Button>
      </Link>
    </li>
  );
}
