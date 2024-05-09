import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import Button from "@/components/Button";

interface AddVoteBtnProps {
  id: number;
  openMenu: any;
}

export default function AddVoteBtn({ id, openMenu }: AddVoteBtnProps) {
  const handleClick = () => {
    openMenu(id);
  };

  return (
    <div className="flex col-span-2">
      <EllipsisVerticalIcon
        className="w-1/6 h-1/6 hover:cursor-pointer"
        onClick={handleClick}
      />
      <Button variant="primary" size="xs" className="rounded-3xl w-5/6">
        Add Vote
      </Button>
    </div>
  );
}
