import Button from "@/components/Button";
import useServerAction from "@/hooks/useServerAction";
import { removeTechItemVote } from "../techStackService";

interface RemoveVoteBtnProps {
  techItemId: number;
}

export default function RemoveVoteBtn({ techItemId }: RemoveVoteBtnProps) {
  const {
    runAction: removeVoteAction,
    isLoading: removeVoteLoading,
    setIsLoading: setRemoveVoteLoading,
  } = useServerAction(removeTechItemVote);

  const handleClick = async () => {
    console.log(techItemId);
    const [res, error] = await removeVoteAction({
      techItemId,
    });
    if (error) {
      //TODO: add error handling dispatch new component.
      console.log(error);
    }
    setRemoveVoteLoading(false);
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
