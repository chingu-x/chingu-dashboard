import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ModalSection from "@/app/(main)/my-voyage/[teamId]/voyage-resources/components/ModalSection";
import { CheckboxGroupItem } from "@/components/inputs/CheckBoxGroup/CheckboxGroupItem";
import Modal from "@/components/modals/Modal";
import Button from "@/components/Button";

import { onCloseModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useModal, useResource } from "@/store/hooks";

export default function ViewModal() {
  const dispatch = useAppDispatch();
  const resourceList = useResource().resources;
  const [resourceData, setResourceData] = useState({ title: "", url: "" });
  const { id, isOpen, type } = useModal();
  const isModalOpen = isOpen && type === "viewResource";

  const data = useCallback(() => {
    let title = "";
    let url = "";

    if (resourceList && id) {
      const resource = resourceList.find((item) => item.id === id);
      if (resource) {
        title = resource.title;
        url = resource.url;
      }
    }
    return { title: title, url: url };
  }, [id, resourceList]);

  const handleClose = () => {
    dispatch(onCloseModal());
  };

  const openLink = () => {
    window.open(resourceData.url, "_blank");
  };

  const handleChange = () => {
    localStorage.setItem("hideResourceModal", JSON.stringify(true));
  };

  useEffect(() => {
    setResourceData(data());
  }, [data]);

  return (
    <Modal isOpen={isModalOpen} title="View Resource?" onClose={handleClose}>
      <form>
        <ModalSection heading="Are you sure you would like to visit this resource?">
          <p className="text-neutral">{resourceData.title}</p>
        </ModalSection>
        <ModalSection heading="Full link of resource:">
          <Link
            className="text-neutral"
            href={resourceData.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {resourceData.url}
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
            onChange={handleChange}
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
