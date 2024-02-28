import { useState } from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import ModalSection from "./ModalSection";
import Modal from "@/components/modals/Modal";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import { onClose } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function DeleteModal () {
  const dispatch = useAppDispatch();
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const [ deleteAlertIsVisible, setDeleteAlertIsVisible ] = useState(false);
  const isModalOpen = isOpen && type === "deleteResource";

  //TODO: replace title with actual data.
  const title = "title here";
  
  const handleClose = () => {
    setDeleteAlertIsVisible(false);
    dispatch(onClose());
  };
  const onDelete = () => {
    setDeleteAlertIsVisible(true);
  };
  const onDeleteConfirmed = () => {
    handleClose();
  };

  return (
    <Modal isOpen={isModalOpen} title="Confirm Deletion?" onClose={handleClose}>
      <form>
        {deleteAlertIsVisible && (
          <Alert context="error" message={ "You cannot undo this action."}/>
        )}
        <ModalSection heading="Are you sure you would like to visit this resource?">
          <p className="text-neutral">{title}</p>
        </ModalSection>
        <div className="flex justify-between w-full h-16">
          <Button 
            size="lg" 
            variant="neutral" 
            onClick={handleClose} 
            className="w-3/6 m-1"
          >
            Go Back
          </Button>
          <Button
            size="lg" 
            variant="error"
            onClick= {deleteAlertIsVisible ? onDeleteConfirmed :  onDelete }
            className="w-3/6 m-1"
          >
            <TrashIcon className="w-4 h-4"/>
            {deleteAlertIsVisible ? "Confirm Deletion" : "Delete" }
          </Button>
        </div>
      </form>
    </Modal>
  );
};
