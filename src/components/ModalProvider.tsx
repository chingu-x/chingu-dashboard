"use client";

import { useEffect, useState } from "react";

import { Example1Modal, Example2Modal } from "./modals";

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
    </>
  );
}
