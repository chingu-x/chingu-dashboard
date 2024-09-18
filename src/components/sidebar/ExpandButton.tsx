import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

interface ExpandButtonProps {
  isOpen: boolean;
  onClick: (status: boolean) => void;
}

export default function ExpandButton({ isOpen, onClick }: ExpandButtonProps) {
  return (
    <button
      type="button"
      className="border-none bg-base-200 capitalize text-neutral-focus hover:bg-base-200"
      onClick={() => onClick(!isOpen)}
      aria-label={`${isOpen ? "close sidebar" : "open sidebar"}`}
    >
      {isOpen ? (
        <ArrowLeftOnRectangleIcon className="h-6" />
      ) : (
        <ArrowRightOnRectangleIcon className="h-6" />
      )}
    </button>
  );
}
