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
    <div className="flex justify-end items-center w-[165px] col-span-2">
      {numberOfVotes < 2 && (
        <EllipsisVerticalIcon
          className=" rounded-xl hover:bg-base-100 mr-2 w-1/6 h-1/6 hover:cursor-pointer"
          onClick={handleClick}
        />
      )}
      <Button
        variant="error"
        size="xs"
        className="rounded-3xl justify-self-end font-semibold"
      >
        Remove Vote
      </Button>
    </div>
  );
}
