import Button from "@/components/Button";
import useServerAction from "@/hooks/useServerAction";
import { addTechItemVote } from "../techStackService";
import Spinner from "@/components/Spinner";

interface AddVoteBtnProps {
  techItemId: number;
}

export default function AddVoteBtn({ techItemId }: AddVoteBtnProps) {
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
      //TODO add error component dispatch.
      console.log(error);
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
        isDisabled={addVoteLoading}
      >
        Add Vote
        {addVoteLoading && <Spinner />}
      </Button>
    </div>
  );
}
