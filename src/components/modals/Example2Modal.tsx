"use client";

import Modal from "./Modal";
import { TextInput } from "@/components/inputs";

export default function Example2Modal() {
  return (
    <Modal
      title="add feature"
      modalType="example2"
      primaryActionLabel="submit"
      onSubmit={() => {}}
    >
      <div className="flex flex-col gap-6">
        <TextInput
          id="suggestion"
          placeholder="What is your tech stack suggestion?"
        />
      </div>
    </Modal>
  );
}
