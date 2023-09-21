import Link from "next/link";
import { usePathname } from "next/navigation";
import { MainPages, PageProperty, voyagePages } from "./Sidebar";
import { Button } from "@/components";

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
    isOpen ? "w-[14.375rem] flex justify-start pl-6" : "w-[3.125rem]"
  } h-[3.125rem] text-base-300 capitalize border-none hover:bg-neutral-content`;

  const getButtonBackgroundStyle = (page: string) =>
    (selectedButton === page && selectedButton === currentPath) ||
    (page === "" &&
      voyagePages.some((voyagePage) => voyagePage.link === selectedButton))
      ? "bg-neutral-content"
      : "bg-base-200";

  const getButtonText = (page: string) => (isOpen ? page : "");

  return (
    <li>
      <Link href={element.name !== String(MainPages.myVoyage) ? link : ""}>
        <Button
          title={element.name}
          customClassName={`${buttonStyles} ${getButtonBackgroundStyle(
            element.link,
          )} ${element.marginBottom}`}
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
