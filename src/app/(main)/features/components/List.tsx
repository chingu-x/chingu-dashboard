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
import { onOpen } from "@/store/features/modal/modalSlice";

import Button from "@/components/Button";

interface ListProps {
  id: string;
  title: string;
  features: Feature[];
  currentUser: {
    id: string;
    teamId: number;
  };
}

export default function List({ id, title, features, currentUser }: ListProps) {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(
      onOpen({
        type: "feature",
      }),
    );
  }
  return (
    <div className="w-full px-8 py-10 font-semibold card bg-secondary-content rounded-2xl text-base-300">
      <div className="p-0 card-body gap-y-6">
        <h4 className="mb-2 text-xl capitalize card-title">{title}</h4>
        {/* Features container / drag and drop area */}
        <Droppable droppableId={id}>
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div
              className={`max-h-[300px] overflow-y-auto overflow-x-hidden px-2 rounded-lg ${
                snapshot.draggingFromThisWith && "bg-secondary/20"
              } ${snapshot.isDraggingOver && "bg-base-100/40"}`}
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
                    currentUserId={currentUser.id}
                  />
                ))}
                {provided.placeholder}
              </ul>
            </div>
          )}
        </Droppable>
        <div className="card-actions">
          {/* Similiar to tech stack button, need to be a shared component */}
          <Button
            variant="secondary"
            size="lg"
            className="justify-start w-full"
            onClick={handleClick}
          >
            <PlusCircleIcon className="h-[18px] w-[18px] text-base-300" />
            Add Feature
          </Button>
        </div>
      </div>
    </div>
  );
}
