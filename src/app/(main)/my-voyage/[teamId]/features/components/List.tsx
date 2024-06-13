import {
  Droppable,
  type DroppableProvided,
  type DroppableStateSnapshot,
} from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
// import { Feature } from "./fixtures/Features";
import AddFeaturesInput from "./AddFeaturesInput";
import ListItem from "./ListItem";
import { type Features } from "@/store/features/features/featuresSlice";

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
    <div className="flex w-full flex-col rounded-2xl bg-base-200 py-6 font-semibold text-base-300">
      <h2 className="mx-6 mb-4 text-xl capitalize">{title}</h2>
      {/* Features container / drag and drop area */}
      <Droppable droppableId={id.toString()}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div className="relative mx-4 overflow-x-hidden rounded-lg">
            {/* Empty list suggestion */}
            {features.length === 0 && !snapshot.isDraggingOver && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3 } }}
                className="absolute my-3 w-full rounded-lg bg-base-100 px-[22px] py-[18px] text-neutral-focus"
              >
                Share your suggestions!
              </motion.span>
            )}
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex max-h-[300px] min-h-[130px] flex-col overflow-y-auto overflow-x-hidden px-2 ${
                snapshot.draggingFromThisWith && "bg-base-content"
              } ${snapshot.isDraggingOver && "bg-base-content"}`}
            >
              {features.map((feature, index) => (
                <ListItem key={feature.id} feature={feature} index={index} />
              ))}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
      <div ref={listRef} className="mt-3">
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
