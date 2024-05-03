import { useParams, useRouter } from "next/navigation";
import { type FinalizedIdeation } from "./FinalizeIdeationList";
import useServerAction from "@/hooks/useServerAction";
import Button from "@/components/Button";
import { finalizeIdeation } from "@/myVoyage/ideation/ideationService";
import routePaths from "@/utils/routePaths";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import Spinner from "@/components/Spinner";

interface ConfirmationButtonProps {
  finalizedIdeation: FinalizedIdeation | undefined;
}

export default function ConfirmationButton({
  finalizedIdeation,
}: ConfirmationButtonProps) {
  const params = useParams<{ teamId: string }>();
  const teamId = Number(params.teamId);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    runAction: finalizeIdeationAction,
    isLoading: finalizeIdeationLoading,
    setIsLoading: setFinalizeIdeationLoading,
  } = useServerAction(finalizeIdeation);

  async function handleClick() {
    const [res, error] = await finalizeIdeationAction({
      teamId,
      ideationId: finalizedIdeation!.id,
    });

    if (res) {
      router.push(routePaths.ideationPage(teamId.toString()));
    }

    if (error) {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } })
      );
    }

    setFinalizeIdeationLoading(false);
  }

  function renderButtonContent() {
    if (finalizeIdeationLoading) {
      return <Spinner />;
    }

    return "Finalize Project Idea Selection";
  }

  return (
    <Button
      variant="secondary"
      disabled={!finalizedIdeation}
      className="w-full mt-10 mb-4"
      onClick={handleClick}
    >
      {renderButtonContent()}
    </Button>
  );
}
