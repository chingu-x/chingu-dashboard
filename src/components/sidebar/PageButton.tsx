import Link from "next/link";
import { usePathname } from "next/navigation";
import { MainPages, PageProperty, voyagePages } from "./Sidebar";
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
    isOpen
      ? "w-[14.375rem] flex justify-start pl-6"
      : "w-[3.125rem] tooltip hover:tooltip-open tooltip-right before:bg-base-100 before:text-base-300 after:border-r-base-100 overflow:false"
  } h-[3.125rem] text-base-300 capitalize border-none hover:bg-base-100`;

  const getButtonBackgroundStyle = (page: string) =>
    (selectedButton === page && selectedButton === currentPath) ||
    (page === "" &&
      voyagePages.some((voyagePage) => voyagePage.link === selectedButton))
      ? "bg-neutral-content"
      : "bg-base-200";

  const getButtonText = (page: string) => (isOpen ? page : "");

  return (
    <li className="border border-blue-500 flex">
      <Link
        href={element.name !== MainPages.myVoyage ? link : ""}
        className={
          element.name === MainPages.myVoyage && isOpen
            ? "cursor-default pointer-events-none"
            : ""
        }
      >
        <button
          type="button"
          data-tip={element.name}
          className={`${buttonStyles} ${getButtonBackgroundStyle(
            element.link,
          )} ${element.marginBottom}`}
          onMouseEnter={() => setHoveredButton(element.name)}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => onClick(element)}
        >
          <Tooltip
            content={getButtonText(element.name)}
            position="right"
            tooltipWidth="small"
          >
            {element.icon}
          </Tooltip>
        </button>
      </Link>
    </li>
  );
}
