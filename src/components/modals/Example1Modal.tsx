"use client";

import Modal from "./Modal";
import { TextInput, Textarea } from "@/components/inputs";

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
      <div className="flex flex-col gap-6">
        <TextInput
          id="title"
          label="title"
          placeholder="Enter you voyage project idea"
        />
        <Textarea
          id="project-idea"
          label="project idea"
          placeholder="Describe your idea. What problem or challenge do you aim to address or solve? What is the primary purpose and goal of your idea? Who are your intemded users?"
        />
        <Textarea
          id="vision-statement1"
          label="vision statement"
          placeholder="Share your insoiring vision. How will you provide value and benefits to users? What long term impact do you hope to achieve?"
        />
        <Textarea
          id="vision-statement2"
          label="vision statement"
          placeholder="Share your insoiring vision. How will you provide value and benefits to users? What long term impact do you hope to achieve?"
        />
      </div>
    </Modal>
  );
}
