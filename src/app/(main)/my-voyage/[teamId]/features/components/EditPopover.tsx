import { type Dispatch, type SetStateAction } from "react";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { deleteFeature } from "@/myVoyage/features/featuresService";
import EditMenu from "@/components/EditMenu";

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
      }),
    );
  }

  return <EditMenu handleClick={handleClick} handleDelete={handleDelete} />;
}
