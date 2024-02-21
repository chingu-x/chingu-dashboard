import Modal from "@/components/modals/Modal";
import ModalSection from "./ModalSection";
import Button from "@/components/Button";


interface DeleteModalProps {
  selectedResource:any;
  viewing:boolean;
  handleClose: () => void;
}

export default function ( {selectedResource,viewing,handleClose }: DeleteModalProps) {
  const confirmDelete = (event:any) => {
    //Todo:
    //replace with delete req. to BE.
    event.preventDefault()
  }
  return (
    <Modal isOpen={viewing} title="Confirm Deletion?" onClose={handleClose}>
      {
        <form>
           <ModalSection heading="Are you sure you would like to visit this resource?">
            {<p>{selectedResource.title}</p>}
          </ModalSection>         
          <div className="flex justify-between w-full h-16">
            <Button size="lg" variant="neutral" onClick={handleClose} className="w-3/6 m-1">Go Back</Button>
            <Button type="submit" size="lg" variant="error" onSubmit={confirmDelete} className="w-3/6 m-1">Delete</Button>
          </div>
        </form>
      }
    </Modal>
  )
}