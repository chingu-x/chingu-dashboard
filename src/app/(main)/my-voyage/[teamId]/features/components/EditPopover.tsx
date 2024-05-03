import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { type Dispatch, type SetStateAction } from "react";
import Button from "@/components/Button";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { deleteFeature } from "@/myVoyage/features/featuresService";

interface EditPopoverProps {
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setShowPopover: Dispatch<SetStateAction<boolean>>;
  featureId: number;
}

export default function EditPopover({
  setEditMode,
  setShowPopover,
  featureId,
}: EditPopoverProps) {
  const dispatch = useAppDispatch();

  function handleClick() {
    setEditMode(true);
    setShowPopover(false);
  }

  function handleDelete() {
    dispatch(
      onOpenModal({
        type: "confirmation",
        content: {
          title: "Confirm Deletion",
          message:
            "Are you sure you want to delete? You will permanently lose all the information and will not be able to recover it.",
          confirmationText: "Delete",
          cancelText: "Keep It",
        },
        payload: {
          params: {
            featureId,
          },
          redirect: null,
          deleteFunction: deleteFeature,
        },
      })
    );
  }

  return (
    <div className="flex flex-col justify-evenly items-center w-[150px] h-[116px] bg-base-200 border border-base-100 rounded-lg shadow-lg absolute top-0 right-0 z-10">
      <Button
        variant="outline"
        size="sm"
        className="w-[118px] h-[34px] justify-start"
        onClick={handleClick}
      >
        <PencilSquareIcon className="w-4 h-4" />
        Edit
      </Button>
      <Button
        variant="error"
        size="sm"
        className="w-[118px] h-[34px] justify-start"
        onClick={handleDelete}
      >
        <TrashIcon className="w-4 h-4" />
        Delete
      </Button>
    </div>
  );
}
