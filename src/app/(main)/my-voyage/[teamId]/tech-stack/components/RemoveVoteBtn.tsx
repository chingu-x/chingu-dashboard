import { removeTechItemVote } from "@/myVoyage/tech-stack/techStackService";
import Button from "@/components/Button";
import useServerAction from "@/hooks/useServerAction";
import Spinner from "@/components/Spinner";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";

interface RemoveVoteBtnProps {
  techItemId: number;
}

export default function RemoveVoteBtn({ techItemId }: RemoveVoteBtnProps) {
  const dispatch = useAppDispatch();
  const {
    runAction: removeVoteAction,
    isLoading: removeVoteLoading,
    setIsLoading: setRemoveVoteLoading,
  } = useServerAction(removeTechItemVote);

  const handleClick = async () => {
    const [, error] = await removeVoteAction({
      techItemId,
    });
    if (error) {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    }
    setRemoveVoteLoading(false);
  };

  return (
    <Button
      variant="error"
      size="xs"
      className="justify-self-end rounded-3xl font-semibold"
      onClick={handleClick}
      disabled={removeVoteLoading}
    >
      Remove Vote
      {removeVoteLoading && <Spinner />}
    </Button>
  );
}
