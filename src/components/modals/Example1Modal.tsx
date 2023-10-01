"use client";

import Modal from "./Modal";

export default function Example1Modal() {
  return (
    <Modal
      title="create project"
      modalType="example1"
      primaryActionLabel="submit"
      secondaryAction={() => {}}
      secondaryActionLabel="delete project"
      onSubmit={() => {}}
    >
      <div className="flex flex-col gap-4">
        <textarea className="textarea" placeholder="Bio"></textarea>
        <input type="text" placeholder="Type here" className="w-full input" />
        <input type="text" placeholder="Type here" className="w-full input" />
        <input type="text" placeholder="Type here" className="w-full input" />
        <input type="text" placeholder="Type here" className="w-full input" />
        <textarea className="textarea" placeholder="Bio"></textarea>
        <textarea className="textarea" placeholder="Bio"></textarea>
        <textarea className="textarea" placeholder="Bio"></textarea>
        <textarea className="textarea" placeholder="Bio"></textarea>
      </div>
    </Modal>
  );
}
