import Link from "next/link";
import ModalSection from "@/app/(main)/my-voyage/[teamId]/voyage-resources/components/ModalSection";
import { CheckboxGroupItem } from "@/components/inputs/CheckBoxGroup/CheckboxGroupItem";
import Modal from "@/components/modals/Modal";
import Button from "@/components/Button";

import { onCloseModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useModal } from "@/store/hooks";

export default function ViewModal() {
  const dispatch = useAppDispatch();
  const { isOpen, type, content } = useModal();
  const isModalOpen = isOpen && type === "viewResource";

  const handleClose = () => {
    dispatch(onCloseModal());
  };

  const openLink = () => {
    if (content?.link) {
      window.open(content.link, "_blank");
    }
  };

  return (
    <Modal isOpen={isModalOpen} title="View Resource?" onClose={handleClose}>
      <form>
        <ModalSection heading="Are you sure you would like to visit this resource?">
          <p className="text-neutral">{content?.title}</p>
        </ModalSection>
        <ModalSection heading="Are you sure you would like to visit this resource?">
          <Link
            className="text-neutral"
            href={content?.link ? content.link : ""}
            rel="noopener noreferrer"
            target="_blank"
          >
            {content?.link}
          </Link>
        </ModalSection>
        <div className="p-1 mb-4">
          <p className="mb-2 font-bold">
            Would you like to see this message again?
          </p>
          <CheckboxGroupItem
            id="confirmation"
            label="Don't ask me this again when opening resources links"
            className="text-base-300 hover:[&>*:nth-child(3)]:text-neutral-focus"
          />
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
            onClick={openLink}
          >
            Continue
          </Button>
        </div>
      </form>
    </Modal>
  );
}
