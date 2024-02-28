"use client";

import { useEffect, useState } from "react";

import GettingHelpModal from "@/components/modals/GettingHelpModal";
import Example1Modal from "@/components/modals/Example1Modal";
import Example2Modal from "@/components/modals/Example2Modal";
import FeatureModal from "@/components/modals/FeatureModal";
import ErrorModal from "@/components/modals/ErrorModal";
import CheckInSuccessModal from "@/components/modals/CheckInSuccessModal";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Example1Modal />
      <Example2Modal />
      <FeatureModal />
      <ErrorModal />
      <GettingHelpModal />
      <CheckInSuccessModal />
    </>
  );
}
