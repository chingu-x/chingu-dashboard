"use client";

import Modal from "./Modal";

export default function Example2Modal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Modal
      title="add feature"
      modalType="example2"
      primaryActionLabel="Submit"
      onSubmit={() => {}}
    >
      {children}
    </Modal>
  );
}
