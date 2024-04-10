"use client";

import { useEffect, useState } from "react";

import GettingHelpModal from "@/components/modals/GettingHelpModal";
import ErrorModal from "@/components/modals/ErrorModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import ViewModal from "@/components/modals/ViewModal";
import CheckInSuccessModal from "@/components/modals/CheckInSuccessModal";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ErrorModal />
      <GettingHelpModal />
      <DeleteConfirmationModal />
      <ViewModal />
      <CheckInSuccessModal />
    </>
  );
}
