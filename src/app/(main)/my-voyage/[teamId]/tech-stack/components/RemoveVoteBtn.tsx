import { Button } from "@chingu-x/components/button";
import { Spinner } from "@chingu-x/components/spinner";
import { removeTechItemVote } from "@/myVoyage/tech-stack/techStackService";
import useServerAction from "@/hooks/useServerAction";
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
      className={`justify-self-end rounded-3xl font-semibold ${
        removeVoteLoading && "w-3/4"
      }`}
      onClick={handleClick}
      disabled={removeVoteLoading}
    >
      {removeVoteLoading ? <Spinner /> : "Remove Vote"}
    </Button>
  );
}
