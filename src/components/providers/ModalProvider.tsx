"use client";

import { useEffect, useState } from "react";

import GettingHelpModal from "@/components/modals/GettingHelpModal";
import FeatureModal from "@/components/modals/FeatureModal";
import ErrorModal from "@/components/modals/ErrorModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import ViewModal from "@/components/modals/ViewModal";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <FeatureModal />
      <ErrorModal />
      <GettingHelpModal />
      <DeleteConfirmationModal />
      <ViewModal />
    </>
  );
}
