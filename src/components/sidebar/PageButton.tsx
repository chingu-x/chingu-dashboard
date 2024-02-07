import Link from "next/link";
import { MainPages, PageProperty, VoyagePageProperty } from "./Sidebar";
import Button from "@/components/Button";
import Tooltip from "@/components/Tooltip";

interface PageButtonProps {
  element: PageProperty;
  onClick: (element: PageProperty) => void;
  selectedButton: string;
  isOpen: boolean;
  link: string;
  setHoveredButton: (element: string | null) => void;
  voyagePages: VoyagePageProperty[];
}

export default function PageButton({
  element,
  onClick,
  selectedButton,
  isOpen,
  link,
  setHoveredButton,
  voyagePages,
}: PageButtonProps) {
  const buttonStyles = `${
    isOpen ? "w-[14.375rem] flex justify-start pl-6" : "w-[3.125rem] px-0"
  }`;

  const getButtonBackgroundStyle = (page: string) =>
    selectedButton === page ||
    (page === "" &&
      voyagePages.some((voyagePage) => voyagePage.link === selectedButton))
      ? "bg-neutral-content"
      : "bg-base-200";

  const getButtonText = (page: string) => (isOpen ? page : "");

  return (
    <li>
      <Link
        href={element.name !== MainPages.myVoyage ? link : "#"}
        className={
          element.name === MainPages.myVoyage && isOpen
            ? "cursor-default pointer-events-none"
            : ""
        }
      >
        <Tooltip
          content={element.name}
          position="right"
          tooltipWidth="small"
          isDisplay={!isOpen}
        >
          <Button
            type="button"
            size="lg"
            variant="neutral"
            data-tip={element.name}
            className={`${buttonStyles} ${getButtonBackgroundStyle(
              element.link,
            )} ${element.marginBottom} flex items-center`}
            onMouseEnter={() => setHoveredButton(element.name)}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => onClick(element)}
          >
            {element.icon}
            {getButtonText(element.name)}
          </Button>
        </Tooltip>
      </Link>
    </li>
  );
}
