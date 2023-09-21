import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@/components";

interface ExpandButtonProps {
  isOpen: boolean;
  onClick: (status: boolean) => void;
}

export default function ExpandButton({ isOpen, onClick }: ExpandButtonProps) {
  return (
    <Button
      title="Expand"
      customClassName="w-[3.125rem] bg-base-200 text-black capitalize hover:bg-base-200 mr-2 border-none"
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
