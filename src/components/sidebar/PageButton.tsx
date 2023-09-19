import Link from "next/link";
import { MainPages, PageProperty, VoyagePages } from "./Sidebar";
import { Button } from "@/components";

interface PageButtonProps {
  element: PageProperty;
  onClick: (element: string | PageProperty) => void;
  selectedButton: string;
  isOpen: boolean;
  link: string;
}

export default function PageButton({
  element,
  onClick,
  selectedButton,
  isOpen,
  link
}: PageButtonProps) {
  const buttonStyles = `${
    isOpen ? "w-[14.375rem] flex justify-start pl-6" : "w-[3.125rem]"
  } h-[3.125rem] text-black capitalize border-none`;

  const getButtonBackgroundStyle = (page: string) =>
    selectedButton === page ||
    ((page as MainPages) === MainPages.myVoyage &&
      Object.values(VoyagePages).includes(selectedButton as VoyagePages))
      ? "bg-neutral-content"
      : "bg-white";

  const getButtonText = (page: string) => (isOpen ? page : "");

  return (
    <li>
      <Link
        href={
          element.name !== String(MainPages.myVoyage)
            ? link
            : ""
        }
      >
        <Button
          title={element.name}
          customClassName={`${buttonStyles} ${getButtonBackgroundStyle(
            element.name,
          )} ${element.marginBottom}`}
          onClick={() => onClick(element)}
        >
          {element.icon}
          {getButtonText(element.name)}
        </Button>
      </Link>
    </li>
  );
}
