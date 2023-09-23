import Modal from "./Modal";

import { useAppDispatch, useAppSelector } from "@/store";
import { onClose } from "@/store/features/modal";

export default function Example1Modal() {
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === "example1";

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <textarea className="textarea" placeholder="Bio"></textarea>
      <input type="text" placeholder="Type here" className="w-full input" />
      <input type="text" placeholder="Type here" className="w-full input" />
      <input type="text" placeholder="Type here" className="w-full input" />
      <input type="text" placeholder="Type here" className="w-full input" />
    </div>
  );

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        dispatch(onClose());
      }}
      onSubmit={() => {}}
      title="Create project"
      primaryActionLabel="submit"
      secondaryAction={() => {}}
      secondaryActionLabel="delete project"
      body={bodyContent}
    />
  );
}
