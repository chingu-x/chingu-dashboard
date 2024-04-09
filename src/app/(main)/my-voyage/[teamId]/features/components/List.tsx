"use client";

import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "@hello-pangea/dnd";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Feature } from "./fixtures/Features";
import Card from "./Card";

import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";

import Button from "@/components/Button";

interface ListProps {
  id: string;
  title: string;
  features: Feature[];
}

export default function List({ id, title, features }: ListProps) {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(
      onOpenModal({
        type: "feature",
      })
    );
  }
  return (
    <div className="flex flex-col w-full px-8 py-10 font-semibold bg-base-200 rounded-2xl text-base-300">
      <h4 className="mb-2 text-xl capitalize pl-3">{title}</h4>
      {/* Features container / drag and drop area */}
      <Droppable droppableId={id}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div
            className={`max-h-[300px] overflow-y-auto overflow-x-hidden px-3 rounded-lg ${
              snapshot.draggingFromThisWith && "bg-base-content"
            } ${snapshot.isDraggingOver && "bg-base-content"}`}
          >
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col"
            >
              {/* Empty list suggestion */}
              {features.length === 0 && !snapshot.isDraggingOver && (
                <span className="text-neutral-focus bg-base-200 py-[14px] px-[22px] rounded-lg">
                  Share your suggestions!
                </span>
              )}
              {features.map((feature, index) => (
                <Card
                  key={feature.id}
                  index={index}
                  feature={feature}
                />
              ))}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
      {/* Similiar to tech stack button, need to be a shared component */}
      <Button
        variant="link"
        size="lg"
        className="h-10 justify-between p-0 w-full outline-none rounded-lg text-neutral-focus font-medium shadow-md border border-base-100 mt-6"
        onClick={handleClick}
      >
        <div className="pl-3">Add Feature</div>
        <div className="flex justify-center items-center w-12 h-full bg-neutral rounded-br-lg rounded-tr-lg">
          <PlusCircleIcon className="w-6 h-6 text-base-200" />
        </div>
      </Button>
    </div>
  );
}
