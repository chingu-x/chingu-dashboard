import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import Button from "@/components/Button";

interface ExpandButtonProps {
  isOpen: boolean;
  onClick: (status: boolean) => void;
}

export default function ExpandButton({ isOpen, onClick }: ExpandButtonProps) {
  return (
    <Button
      title="Expand"
      customClassName="bg-base-200 text-base-300 capitalize hover:bg-base-200 mr-6 border-none mt-4 flex items-center"
      onClick={() => onClick(!isOpen)}
    >
      {isOpen ? (
        <ArrowLeftOnRectangleIcon className="h-6" />
      ) : (
        <ArrowRightOnRectangleIcon className="h-6" />
      )}
    </Button>
  );
}
