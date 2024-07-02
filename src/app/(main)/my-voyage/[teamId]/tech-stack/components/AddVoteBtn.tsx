import Button from "@/components/Button";

interface AddVoteBtnProps {
  techItemId: number;
}

export default function AddVoteBtn({ techItemId }: AddVoteBtnProps) {
  const handleClick = () => {
    console.log(techItemId);
  };

  return (
    <div className="col-span-3 flex justify-end">
      <Button
        variant="primary"
        size="xs"
        className="rounded-3xl font-semibold"
        onClick={handleClick}
      >
        Add Vote
      </Button>
    </div>
  );
}
