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
      className="bg-base-200 text-base-300 capitalize hover:bg-base-200 border-none"
      onClick={() => onClick(!isOpen)}
    >
      {isOpen ? (
        <ArrowLeftOnRectangleIcon className="h-6" />
      ) : (
        <ArrowRightOnRectangleIcon className="h-6" />
      )}
    </button>
  );
}
