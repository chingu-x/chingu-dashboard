"use client";

import { useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { TrashIcon } from "@heroicons/react/20/solid";
import Modal from "./Modal";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import { onCloseModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useModal } from "@/store/hooks";
import useDelete from "@/hooks/useDelete";

export default function DeleteConfirmationModal() {
  const { isOpen, type, id } = useModal();
  const modal = useModal();
  const dispatch = useAppDispatch();
  const params = useParams<{ teamId: string; ideationId: string }>();
  const teamId = +params.teamId;
  const router = useRouter();
  const types = ["confirmation", "resource"];
  const isModalOpen = isOpen && type && types.includes(type);
  const getPayload = useCallback(() => {
    switch (type) {
      case "confirmation":
        return {
          deleteArgs: { teamId, ideationId: params.ideationId },
          redirect: { router: router, route: teamId.toString() },
        };
      case "resource":
        return {
          deleteArgs: { resourceId: id },
          redirect: null,
        };
      default:
        return {};
    }
  }, [type]);
  const payload = getPayload();
  const deleteType = useDelete(type, payload);

  const handleClose = () => {
    dispatch(onCloseModal());
  };

  function renderDeleteButtonContent() {
    if (deleteType.loadingState) {
      return <Spinner />;
    }
    return (
      <>
        <TrashIcon className="w-4 h-4" />
        {modal.content?.confirmationText}
      </>
    );
  }

  return isModalOpen ? (
    <Modal
      isOpen={isModalOpen}
      title={modal.content!.title!}
      onClose={handleClose}
    >
      <div className="mb-10 text-base text-base-300 font-medium max-w-[650px]">
        {modal.content?.message}
      </div>
      <div className="flex gap-x-10 mt-10">
        <Button
          size="lg"
          variant="neutral"
          type="button"
          onClick={handleClose}
          className="w-1/2"
        >
          Keep It
        </Button>
        <Button
          size="lg"
          variant="error"
          type="button"
          disabled={deleteType.loadingState}
          onClick={deleteType.handleClick}
          className="w-1/2"
        >
          {renderDeleteButtonContent()}
        </Button>
      </div>
    </Modal>
  ) : null;
}
