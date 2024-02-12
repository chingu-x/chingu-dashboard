"use client";

import { useEffect, useState } from "react";

import Example1Modal from "@/components/modals/Example1Modal";
import Example2Modal from "@/components/modals/Example2Modal";
import FeatureModal from "@/components/modals/FeatureModal";

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
    </>
  );
}
