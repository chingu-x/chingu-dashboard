"use client";

import { useParams, useRouter } from "next/navigation";
import { TrashIcon } from "@heroicons/react/20/solid";
import Modal from "./Modal";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";
import { onCloseModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useModal } from "@/store/hooks";
import { deleteAgendaTopic } from "@/myVoyage/sprints/sprintsService";
import useDelete from "@/hooks/useDelete";
import routePaths from "@/utils/routePaths";

export default function DeleteAgendaTopicConfirmationModal() {
  const { isOpen, type } = useModal();
  const { title, message, confirmationText } = useModal().content!;
  const dispatch = useAppDispatch();
  const params = useParams<{
    teamId: string;
    sprintNumber: string;
    meetingId: string;
    agendaId: string;
  }>();
  const [teamId, sprintNumber, meetingId, agendaId] = [
    Number(params.teamId),
    Number(params.sprintNumber),

    Number(params.meetingId),
    Number(params.agendaId),
  ];

  const route = routePaths.sprintWeekPage(
    teamId.toString(),
    sprintNumber.toString(),
    meetingId.toString(),
  );
  const router = useRouter();
  const payload = {
    params: { agendaId, sprintNumber },
    redirect: { router, route },
    deleteFunction: deleteAgendaTopic,
  };
  const { handleDelete, isLoading } = useDelete(payload);

  const isModalOpen = isOpen && type === "deleteAgendaConfirmation";

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
        {confirmationText}
      </>
    );
  }

  return (
    <Modal isOpen={isModalOpen} title={title!} onClose={handleClose}>
      <div className="mb-10 text-base text-base-300 font-medium max-w-[650px]">
        {message}
      </div>
      <div className="flex mt-10 gap-x-10">
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
  );
}
