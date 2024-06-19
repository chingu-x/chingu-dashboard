import Button from "@/components/Button";

/*
interface RemoveVoteBtnProps {
  id: number;
}
*/

export default function RemoveVoteBtn(
  {
    /* { id }: RemoveVoteBtnProps */
  },
) {
  return (
    <Button
      variant="error"
      size="xs"
      className="justify-self-end rounded-3xl font-semibold"
    >
      Remove Vote
    </Button>
  );
}
