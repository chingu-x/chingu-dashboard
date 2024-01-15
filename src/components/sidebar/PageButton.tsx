import Link from "next/link";
import { usePathname } from "next/navigation";
import { MainPages, PageProperty, voyagePages } from "./Sidebar";
import Button from "@/components/Button";

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
      : "w-[3.125rem] tooltip hover:tooltip-open tooltip-right before:bg-base-100 before:text-base-300 after:border-r-base-100 overflow:false px-0"
  } h-[3.125rem] text-base-300 capitalize border-none hover:bg-base-100 active:bg-neutral-content focus:bg-neutral-content focus:text-base-300`;

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
      </Link>
    </li>
  );
}
