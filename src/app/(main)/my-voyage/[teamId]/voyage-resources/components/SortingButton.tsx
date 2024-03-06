import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import Button from "@/components/Button";

interface SortingButtonProps {
  onClick: () => void;
  type: boolean;
}
export default function SortingButton({ onClick, type }: SortingButtonProps) {
  const buttonText = type ? "Newest First" : "Oldest First";
  const ArrowIcon = type ? <ArrowDownIcon /> : <ArrowUpIcon />;

  return (
    <Button onClick={onClick} className="m-1 whitespace-nowrap" variant="link">
      {buttonText}
      <div className="w-4 h-4">{ArrowIcon}</div>
    </Button>
  );
}
