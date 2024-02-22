"use client";

import { useEffect, useState } from "react";

import Example1Modal from "./modals/Example1Modal";
import Example2Modal from "./modals/Example2Modal";
import FeatureModal from "./modals/FeatureModal";
import CheckInSuccessModal from "./modals/CheckInSuccessModal";
import VoyageSuccessModal from "./modals/VoyageSuccessModal";

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
      <CheckInSuccessModal />
      <VoyageSuccessModal />
    </>
  );
}
