import Link from "next/link";
import ModalSection from "./ModalSection";
import Modal from "@/components/modals/Modal";
import Button from "@/components/Button";
import { onClose } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function ViewModal () {
  const dispatch = useAppDispatch();
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const isModalOpen = isOpen && type === "viewResource";
  
  //TODO: replace data with actual data.
  const data = { title:"title here", href:"link url here" };

  const handleClose = () => {  
    dispatch(onClose());
  };

  return(
    <Modal isOpen={isModalOpen} title="View Resource?" onClose={handleClose}>
      <form>
        <ModalSection heading="Are you sure you would like to visit this resource?">
          <p className="text-neutral">{data.title}</p>
        </ModalSection>
        <ModalSection heading="Are you sure you would like to visit this resource?">
          <Link 
            className="text-neutral"
            href={data.href}
            rel="noopener noreferrer" 
            target="_blank"
          >
            {data.href}
          </Link>
        </ModalSection>
        <div className="p-1 mb-4">
          <p className="font-bold">Would you like to see this message again?</p>
          <input className="mr-2" type="checkbox" />
          <label>
            Don&apos;t ask me this again when opening resources links.
          </label>
        </div>
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
            variant="primary"  
            className="w-3/6 m-1"
          >
            Continue
          </Button>
        </div>
      </form>      
    </Modal>
  );
};
