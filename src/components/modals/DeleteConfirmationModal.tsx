"use client";

import { useCallback, useEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { TrashIcon } from "@heroicons/react/20/solid";
import Modal from "./Modal";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import { onCloseModal, onOpenModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useModal } from "@/store/hooks";
import useServerAction from "@/hooks/useServerAction";
import useDelete from "@/hooks/useDelete";
import { deleteIdeation } from "@/app/(main)/my-voyage/[teamId]/ideation/ideationService";
import routePaths from "@/utils/routePaths";
import { deleteResource } from "@/app/(main)/my-voyage/[teamId]/voyage-resources/resourcesService";

export default function DeleteConfirmationModal() {
  const { isOpen, type, id } = useModal();
  const modal = useModal();
  const dispatch = useAppDispatch();
  const params = useParams<{ teamId: string; ideationId: string }>();
  const teamId = +params.teamId;
  const path = usePathname();
  const router = useRouter();

  //const isModalOpen = isOpen && type === "confirmation";
  //const isTypeResource = path === `/my-voyage/${teamId}/voyage-resources`;

  const types = ["fake", "not real", "confirmation", "other"];
  const isModalOpen = isOpen && type && types.includes(type);

  const callBackProps = {
    teamId: teamId,
    id: id,
    ideationId: params.ideationId,
  };
  const helpers = { router: router };
  const deleteType = useDelete(type, callBackProps, helpers);

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

  useEffect(() => {}, [isOpen]);

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
