import Modal from "./Modal";

import { useAppDispatch, useAppSelector } from "@/store";
import { onClose } from "@/store/features/modal";

export default function Example2Modal() {
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === "example2";

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <textarea
        className="textarea"
        placeholder="What is your feature suggestion?"
      />
    </div>
  );

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        dispatch(onClose());
      }}
      onSubmit={() => {}}
      title="add feature"
      primaryActionLabel="submit"
      body={bodyContent}
    />
  );
}
