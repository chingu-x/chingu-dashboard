"use client";

import Image from "next/image";
import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

import { Feature } from "./fixtures/Features";

import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";

interface CardProps {
  feature: Feature;
  currentUserId: string;
  index: number;
}

export default function Card({ feature, currentUserId, index }: CardProps) {
  const dispatch = useAppDispatch();
  const userFullName =
    feature.addedBy.member.firstName + " " + feature.addedBy.member.lastName;

  function handleClick() {
    dispatch(
      onOpenModal({
        type: "feature",
        content: "",
        isEditing: true,
      }),
    );
  }

  return (
    <Draggable draggableId={feature.id.toString()} index={index}>
      {(provided: DraggableProvided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-base-200 py-[14px] px-[22px] rounded-lg text-base-300 my-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-1">
              <h5 className="text-base font-semibold">{feature.description}</h5>
              <span className="text-[10px] text-neutral">{`Added by ${
                feature.addedBy.member.id === currentUserId
                  ? "you"
                  : userFullName
              }`}</span>
            </div>
            {feature.addedBy.member.id === currentUserId ? (
              // Edit Button
              <button
                type="button"
                onClick={handleClick}
                className="p-0 m-0 bg-transparent border-none hover:bg-transparent gap-x-0"
                aria-label="feature menu"
              >
                <EllipsisVerticalIcon className="w-5 h-5 text-base-300" />
              </button>
            ) : (
              // Creator's avatar
              <div className="overflow-hidden rounded-full">
                <Image
                  width={24}
                  height={24}
                  style={{ objectFit: "cover" }}
                  src={feature.addedBy.member.avatar}
                  alt={userFullName}
                />
              </div>
            )}
          </div>
        </li>
      )}
    </Draggable>
  );
}
