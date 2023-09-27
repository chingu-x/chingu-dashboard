"use client";

import Modal from "./Modal";

export default function Example1Modal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Modal
      title="create project"
      modalType="example1"
      primaryActionLabel="Submit"
      secondaryActionLabel="Delete Project"
      onSubmit={() => {}}
      secondaryAction={() => {}}
    >
      {children}
    </Modal>
  );
}
