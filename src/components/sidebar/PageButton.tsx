import { useState } from "react";
import Link from "next/link";
import { Tooltip } from "@chingu-x/components/tooltip";
import { MainPages, type PageProperty } from "./Sidebar";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";

interface PageButtonProps {
  element: PageProperty;
  onClick: (element: PageProperty) => void;
  selectedButton: string;
  isOpen: boolean;
  link: string;
  setHoveredButton: (element: string | null) => void;
  ariaLabel: string;
}

export default function PageButton({
  element,
  onClick,
  selectedButton,
  isOpen,
  link,
  setHoveredButton,
  ariaLabel,
}: PageButtonProps) {
  const isActive = selectedButton.includes(link);

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
            className={cn(
              "h-[3.125rem] w-[3.125rem] justify-center bg-base-200 p-0 text-neutral-focus",
              isActive && "bg-primary-content text-base-300",
              isOpen && "flex w-full justify-start px-6",
              element.marginBottom,
            )}
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
