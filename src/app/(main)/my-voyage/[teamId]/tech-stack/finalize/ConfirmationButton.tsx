import { useParams } from "next/navigation";
import createFinalList from "./utils/createFinalList";
import {
  type FinalizedList,
  finalizeTechStack,
} from "@/app/(main)/my-voyage/[teamId]/tech-stack/techStackService";
import type { ConfirmationButtonProps } from "@/app/(main)/my-voyage/[teamId]/tech-stack/finalize/types";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import { useAppDispatch } from "@/store/hooks";
import useServerAction from "@/hooks/useServerAction";
import { onOpenModal } from "@/store/features/modal/modalSlice";

export default function ConfirmationButton({
  selectedItems,
}: ConfirmationButtonProps) {
  const params = useParams();
  const teamId = Number(params.teamId);
  const dispatch = useAppDispatch();

  const {
    runAction: finalizeTechStackAction,
    isLoading: finalizeTechStackLoading,
    setIsLoading: setFinalizeTechStackLoading,
  } = useServerAction(finalizeTechStack);

  const handleClick = async () => {
    const selection = createFinalList(selectedItems);
    const finalList: FinalizedList = {
      categories: selection.map((cat) => ({
        categoryId: cat.categoryId,
        techs: cat.techs,
      })),
    };

    const [res, error] = await finalizeTechStackAction({
      teamId,
      finalizedList: finalList,
    });
    if (res) {
      //redirect to tech stack page (final version)
    }
    if (error) {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    }
    setFinalizeTechStackLoading(false);
  };

  function renderButtonContent() {
    if (finalizeTechStackLoading) {
      return <Spinner />;
    }
    return "Finalize Tech Stack Selection.";
  }

  return (
    <Button
      variant="secondary"
      disabled={finalizeTechStackLoading}
      className="mb-4 mt-10 w-full"
      onClick={handleClick}
    >
      {renderButtonContent()}
    </Button>
  );
}
