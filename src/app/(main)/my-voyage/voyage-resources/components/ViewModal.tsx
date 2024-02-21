import Link from "next/link";
import ModalSection from "./ModalSection";
import Modal from "@/components/modals/Modal";
import Button from "@/components/Button";

interface ViewModalProps {
  selectedResource: { title:string, link:string };
  viewing:boolean;
  handleClose: () => void
}

export default function ViewModal ({ selectedResource, viewing, handleClose }:ViewModalProps) {
  return(
    <Modal isOpen={viewing} title="View Resource?" onClose={handleClose}>      
      <form>
        <ModalSection heading="Are you sure you would like to visit this resource?">
          <p>{selectedResource.title}</p>
        </ModalSection>
        <ModalSection heading="Are you sure you would like to visit this resource?">
          <Link 
            href={selectedResource.link} 
            rel="noopener noreferrer" 
            target="_blank"
          >
            {selectedResource.link}
          </Link>
        </ModalSection>
        <ModalSection heading="Would you like to see this message again?">
          <>
            <input className="mr-2" type="checkbox" />
            <label>
              Don&apos;t ask me this again when opening resources links.
            </label>
          </>
        </ModalSection>          
        <div className="flex justify-between w-full h-16">
          <Button size="lg" variant="neutral" onClick={handleClose} className="w-3/6 m-1">Go Back</Button>
          <Button type="submit" size="lg" variant="primary"  className="w-3/6 m-1">Continue</Button>
        </div>
      </form>      
    </Modal>
  );
};
