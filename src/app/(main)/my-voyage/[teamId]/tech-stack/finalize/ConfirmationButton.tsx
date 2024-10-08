import { useParams, useRouter } from "next/navigation";
import createFinalList from "./utils/createFinalList";
import editFinalList from "./utils/editFinalList";
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
import routePaths from "@/utils/routePaths";

export default function ConfirmationButton({
  isFinalized,
  allCategoriesSelected,
  selectedItems,
  previousSelected,
}: ConfirmationButtonProps) {
  const params = useParams();
  const teamId = Number(params.teamId);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    runAction: finalizeTechStackAction,
    isLoading: finalizeTechStackLoading,
    setIsLoading: setFinalizeTechStackLoading,
  } = useServerAction(finalizeTechStack);

  const handleClick = async () => {
    if (isFinalized) {
      const selection = editFinalList(previousSelected, selectedItems);

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
        router.push(routePaths.techStackPage(teamId.toString()));
      }
      if (error) {
        dispatch(
          onOpenModal({ type: "error", content: { message: error.message } }),
        );
      }
    } else {
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
        router.push(routePaths.techStackPage(teamId.toString()));
      }
      if (error) {
        dispatch(
          onOpenModal({ type: "error", content: { message: error.message } }),
        );
      }
    }

    setFinalizeTechStackLoading(false);
  };

  function renderButtonContent() {
    if (finalizeTechStackLoading) {
      return <Spinner />;
    }
    const text = isFinalized
      ? "Save Changes"
      : "Finalize Tech Stack Selection.";
    return text;
  }

  return (
    <Button
      variant="secondary"
      disabled={finalizeTechStackLoading || !allCategoriesSelected}
      className="mb-4 mt-10 w-full"
      onClick={handleClick}
    >
      {renderButtonContent()}
    </Button>
  );
}
