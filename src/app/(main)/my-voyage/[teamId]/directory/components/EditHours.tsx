"use client";

import TextInput from "@/components/inputs/TextInput";
import { useDirectory } from "@/store/hooks";

interface EditHoursProps {
  hrPerSprint: number;
}

export default function EditHours({ hrPerSprint }: EditHoursProps) {
  return (
    <form onSubmit={() => {}}>
      <TextInput
        clearInputAction={() => {}}
        id="textInput"
        onChange={() => {}}
        placeholder={`${hrPerSprint}`}
        submitButtonText="Save"
        value=""
      />
    </form>
  );
}
