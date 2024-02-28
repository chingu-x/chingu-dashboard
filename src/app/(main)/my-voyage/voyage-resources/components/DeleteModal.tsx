import ModalSection from "./ModalSection";
import Modal from "@/components/modals/Modal";
import Button from "@/components/Button";
import { onClose } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function DeleteModal () {
  const dispatch = useAppDispatch();
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const isModalOpen = isOpen && type === "deleteResource";

  //TODO: replace title with actual data.
  const title = "title here";
  
  const handleClose = () => {  
    dispatch(onClose());
  };

  return (
    <Modal isOpen={isModalOpen} title="Confirm Deletion?" onClose={handleClose}>
      <form>
        <ModalSection heading="Are you sure you would like to visit this resource?">
          <p className="text-neutral">{title}</p>
        </ModalSection>         
        <div className="flex justify-between w-full h-16">
          <Button size="lg" variant="neutral" onClick={handleClose} className="w-3/6 m-1">Go Back</Button>
          <Button type="submit" size="lg" variant="error"  className="w-3/6 m-1">Delete</Button>
        </div>
      </form>
    </Modal>
  );
};
