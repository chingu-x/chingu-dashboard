import Link from "next/link";
import { usePathname } from "next/navigation";
import { MainPages, PageProperty, voyagePages } from "./Sidebar";
import Button from "@/components/Button";
import Tooltip from "@/components/Tooltip";

interface PageButtonProps {
  element: PageProperty;
  onClick: (element: string | PageProperty) => void;
  selectedButton: string;
  isOpen: boolean;
  link: string;
  setHoveredButton: (element: string | null) => void;
}

export default function PageButton({
  element,
  onClick,
  selectedButton,
  isOpen,
  link,
  setHoveredButton,
}: PageButtonProps) {
  const currentPath = usePathname();
  const buttonStyles = `${
    isOpen ? "w-[14.375rem] flex justify-start pl-6" : "w-[3.125rem] px-0"
  }`;

  const getButtonBackgroundStyle = (page: string) =>
    (selectedButton === page && selectedButton === currentPath) ||
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
        <Button
          type="button"
          size="lg"
          variant="neutral"
          data-tip={element.name}
          className={`${buttonStyles} ${getButtonBackgroundStyle(
            element.link
          )} ${element.marginBottom} flex items-center`}
          onMouseEnter={() => setHoveredButton(element.name)}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => onClick(element)}
        >
          <Tooltip
            content={element.name}
            position="right"
            tooltipWidth="small"
            isDisplay={!isOpen}
          >
            {element.icon}
          </Tooltip>
          {getButtonText(element.name)}
        </Button>
      </Link>
    </li>
  );
}
