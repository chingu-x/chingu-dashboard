import Link from "next/link";
import { useCallback } from "react";
import { Button } from "@chingu-x/components/button";
import { Modal } from "@chingu-x/components/modal";
import ModalSection from "@/app/(main)/my-voyage/[teamId]/voyage-resources/components/ModalSection";
import { CheckboxGroupItem } from "@/components/inputs/CheckBoxGroup/CheckboxGroupItem";
import { onCloseModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useModal, useResource } from "@/store/hooks";

export default function ViewModal() {
  const dispatch = useAppDispatch();
  const resourceList = useResource().resources;
  const { id, isOpen } = useModal();

  const { title, url } = useCallback(() => {
    let title: string = "";
    let url: string = "";

    if (resourceList && id) {
      const resource = resourceList.find((item) => item.id === id);
      if (resource) {
        title = resource.title;
        url = resource.url;
      }
    }
    return { title, url };
  }, [id, resourceList])();

  const handleClose = () => {
    dispatch(onCloseModal());
  };

  const openLink = () => {
    window.open(url, "_blank");
    dispatch(onCloseModal());
  };

  const handleChange = () => {
    localStorage.setItem("hideResourceModal", JSON.stringify(true));
  };

  return (
    <Modal isOpen={isOpen} title="View Resource?" onClose={handleClose}>
      <form>
        <ModalSection heading="Are you sure you would like to visit this resource?">
          <p className="text-neutral">{title}</p>
        </ModalSection>
        <ModalSection heading="Full link of resource:">
          <Link
            className="text-neutral"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {url}
          </Link>
        </ModalSection>
        <div className="mb-4 p-1">
          <p className="mb-2 font-bold">
            Would you like to see this message again?
          </p>
          <CheckboxGroupItem
            id="confirmation"
            label="Don't ask me this again when opening resources links"
            className="text-base-300 hover:[&>*:nth-child(3)]:text-neutral-focus"
            onChange={handleChange}
          />
        </div>
        <div className="flex h-16 w-full justify-between">
          <Button
            size="lg"
            variant="neutral"
            onClick={handleClose}
            className="m-1 w-3/6"
          >
            Go Back
          </Button>
          <Button
            size="lg"
            variant="primary"
            className="m-1 w-3/6"
            onClick={openLink}
          >
            Continue
          </Button>
        </div>
      </form>
    </Modal>
  );
}
