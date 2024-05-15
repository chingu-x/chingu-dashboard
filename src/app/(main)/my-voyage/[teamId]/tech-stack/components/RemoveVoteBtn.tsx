import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import Button from "@/components/Button";

interface RemoveVoteBtnProps {
  id: number;
  openMenu: (value: number) => void;
  numberOfVotes: number;
}

export default function RemoveVoteBtn({
  id,
  openMenu,
  numberOfVotes,
}: RemoveVoteBtnProps) {
  const handleClick = () => {
    openMenu(id);
  };

  return (
    <div className="flex justify-end col-span-2">
      {numberOfVotes < 2 && (
        <EllipsisVerticalIcon
          className="w-1/6 h-1/6 hover:cursor-pointer"
          onClick={handleClick}
        />
      )}

      <Button
        variant="error"
        size="xs"
        className="rounded-3xl col-span-2 justify-self-end font-semibold"
      >
        Remove Vote
      </Button>
    </div>
  );
}
