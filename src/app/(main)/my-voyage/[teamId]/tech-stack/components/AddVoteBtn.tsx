import { useState } from "react";
import Button from "@/components/Button";
import useServerAction from "@/hooks/useServerAction";
import { addTechItemVote } from "../techStackService";
import Spinner from "@/components/Spinner";
import ErrorComponent from "@/components/Error";
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
    const [res, error] = await addVoteAction({
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
        Add Vote
        {addVoteLoading && <Spinner />}
      </Button>
    </div>
  );
}
