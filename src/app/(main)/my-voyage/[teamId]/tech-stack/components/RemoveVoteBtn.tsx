import Button from "@/components/Button";

interface RemoveVoteBtnProps {
  techItemId: number;
}

export default function RemoveVoteBtn({ techItemId }: RemoveVoteBtnProps) {
  const handleClick = () => {
    console.log(techItemId);
  };

  return (
    <Button
      variant="error"
      size="xs"
      className="justify-self-end rounded-3xl font-semibold"
      onClick={handleClick}
    >
      Remove Vote
    </Button>
  );
}
