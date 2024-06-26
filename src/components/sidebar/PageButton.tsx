import { useState } from "react";
import Link from "next/link";
import {
  MainPages,
  type PageProperty,
  type VoyagePageProperty,
} from "./Sidebar";
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
  ariaLabel: string;
}

export default function PageButton({
  element,
  onClick,
  selectedButton,
  isOpen,
  link,
  setHoveredButton,
  voyagePages,
  ariaLabel,
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

  const [tooltipHovered, setTooltipHovered] = useState(false);

  return (
    <li>
      <Link
        href={element.name !== MainPages.myVoyage ? link : "#"}
        className={
          element.name === MainPages.myVoyage && isOpen
            ? "pointer-events-none cursor-default"
            : ""
        }
      >
        <Tooltip
          content={element.name}
          position="right"
          tooltipWidth="small"
          isDisplay={!isOpen}
          hovered={tooltipHovered}
        >
          <Button
            type="button"
            size="lg"
            variant="neutral"
            data-tip={element.name}
            aria-label={ariaLabel}
            className={`${buttonStyles} ${getButtonBackgroundStyle(
              element.link,
            )} ${element.marginBottom} flex items-center`}
            onMouseEnter={() => {
              setHoveredButton(element.name);
              setTooltipHovered(true);
            }}
            onMouseLeave={() => {
              setTooltipHovered(false);
              setHoveredButton(null);
            }}
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
