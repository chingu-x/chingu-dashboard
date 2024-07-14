import { addTechItemVote } from "@/myVoyage/tech-stack/techStackService";
import Button from "@/components/Button";
import useServerAction from "@/hooks/useServerAction";
import Spinner from "@/components/Spinner";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";

interface AddVoteBtnProps {
  techItemId: number;
}

export default function AddVoteBtn({ techItemId }: AddVoteBtnProps) {
  const dispatch = useAppDispatch();
  const {
    runAction: addVoteAction,
    isLoading: addVoteLoading,
    setIsLoading: setAddVoteLoading,
  } = useServerAction(addTechItemVote);

  const handleClick = async () => {
    const [, error] = await addVoteAction({
      techItemId,
    });

    if (error) {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    }
    setAddVoteLoading(false);
  };

  return (
    <div className="col-span-3 flex justify-end">
      <Button
        variant="primary"
        size="xs"
        className="rounded-3xl font-semibold"
        onClick={handleClick}
        disabled={addVoteLoading}
      >
        {addVoteLoading ? (
          <div className="px-[28px] py-[2px]">
            <Spinner />
          </div>
        ) : (
          "Add Vote"
        )}
      </Button>
    </div>
  );
}
