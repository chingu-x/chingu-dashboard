import { useState } from "react";
import type { ConfirmationButtonProps, Category } from "./types";
import createFinalList from "./utils/createFinalList";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";

export default function ConfirmationButton({
  selectedItems,
}: ConfirmationButtonProps) {
  const [, /*finalizedList*/ setFinalizedList] = useState<Category[]>([]);
  const spinning = false;

  const handleClick = () => {
    const finalList = createFinalList(selectedItems);
    setFinalizedList(finalList);
  };

  function renderButtonContent() {
    if (spinning) {
      return <Spinner />;
    }
    return "Finalize Tech Stack Selection.";
  }

  return (
    <Button
      variant="secondary"
      disabled={spinning}
      className="mb-4 mt-10 w-full"
      onClick={handleClick}
    >
      {renderButtonContent()}
    </Button>
  );
}
