import Modal from "./Modal";

export default function Example2Modal() {
  return (
    <Modal
      title="add feature"
      modalType="example2"
      primaryActionLabel="submit"
      onSubmit={() => {}}
    >
      <div className="flex flex-col gap-4">
        <textarea
          className="textarea"
          placeholder="What is your feature suggestion?"
        />
      </div>
    </Modal>
  );
}
