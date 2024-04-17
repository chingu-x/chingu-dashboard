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
  const { teamId, ideationId } = useParams<{
    teamId: string;
    ideationId: string;
  }>();
  const router = useRouter();
  const types = ["confirmation", "resource", "ideation"];
  const isModalOpen = isOpen && type && types.includes(type);

  const getPayload = useCallback(() => {
    const payloadMap = {
      ideation: {
        deleteArgs: { teamId, ideationId },
        redirect: { router, route: teamId?.toString() },
      },
      resource: {
        deleteArgs: { resourceId: id },
        redirect: null,
      },
    };

    if (type && type in payloadMap) {
      return payloadMap[type as keyof typeof payloadMap];
    } else {
      return {};
    }
  }, [type, id, teamId, ideationId, router]);

  const payload = getPayload();
  const { isLoading, handleDelete } = useDelete({ type, payload });

  const handleClose = () => {
    dispatch(onCloseModal());
  };

  function renderDeleteButtonContent() {
    if (isLoading) {
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
          disabled={isLoading}
          onClick={handleDelete}
          className="w-1/2"
        >
          {renderDeleteButtonContent()}
        </Button>
      </div>
    </Modal>
  ) : null;
}
