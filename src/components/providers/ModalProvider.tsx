"use client";

import { useEffect, useState } from "react";

import DeleteAgendaTopicConfirmationModal from "@/components/modals/DeleteAgendaTopicConfirmationModal";
import GettingHelpModal from "@/components/modals/GettingHelpModal";
import FeatureModal from "@/components/modals/FeatureModal";
import ErrorModal from "@/components/modals/ErrorModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import ViewModal from "@/components/modals/ViewModal";
import CheckInSuccessModal from "@/components/modals/CheckInSuccessModal";
import { useModal } from "@/store/hooks";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  const modalType = useModal().type;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {modalType === "feature" && <FeatureModal />}
      {modalType === "error" && <ErrorModal />}
      {modalType === "gettingHelp" && <GettingHelpModal />}
      {modalType === "confirmation" && <DeleteConfirmationModal />}
      {modalType === "viewResource" && <ViewModal />}
      {modalType === "checkInSuccess" && <CheckInSuccessModal />}
      {modalType === "deleteAgendaConfirmation" && (
        <DeleteAgendaTopicConfirmationModal />
      )}
    </>
  );
}
