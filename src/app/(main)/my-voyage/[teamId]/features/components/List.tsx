import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "@hello-pangea/dnd";
import { useEffect, useRef, useState } from "react";
// import { Feature } from "./fixtures/Features";
import AddFeaturesInput from "./AddFeaturesInput";
import ListItem from "./ListItem";
import { Features } from "@/store/features/features/featuresSlice";

interface ListProps {
  id: number;
  title: string;
  features: Features[];
}

export default function List({ id, title, features }: ListProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  function handleOutsideClick(e: MouseEvent | TouchEvent) {
    if (listRef.current && !listRef.current.contains(e.target as Node)) {
      setIsEditing(false);
    }
  }

  function handleClick() {
    setIsEditing(true);
  }

  return (
    <div className="flex flex-col w-full px-8 py-10 font-semibold bg-base-200 rounded-2xl text-base-300">
      <h4 className="mb-2 text-xl capitalize pl-3">{title}</h4>
      {/* Features container / drag and drop area */}
      <Droppable droppableId={id.toString()}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div
            className={`max-h-[300px] min-h-[130px] overflow-y-auto overflow-x-hidden px-3 rounded-lg ${
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
                <span className="text-neutral-focus bg-base-100 py-[14px] px-[22px] rounded-lg my-3">
                  Share your suggestions!
                </span>
              )}
              {features.map((feature, index) => (
                <ListItem
                  key={feature.id}
                  feature={feature}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
      <div
        ref={listRef}
        className="mt-3"
      >
        <AddFeaturesInput
          handleClick={handleClick}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          id={id}
        />
      </div>
    </div>
  );
}
