import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "@hello-pangea/dnd";
import { motion } from "framer-motion";
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
    <div className="flex flex-col w-full py-6 font-semibold bg-base-200 rounded-2xl text-base-300">
      <h4 className="mx-6 mb-4 text-xl capitalize">{title}</h4>
      {/* Features container / drag and drop area */}
      <Droppable droppableId={id.toString()}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div className="relative mx-4 overflow-x-hidden rounded-lg">
            {/* Empty list suggestion */}
            {features.length === 0 && !snapshot.isDraggingOver && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3 } }}
                className="absolute w-full text-neutral-focus bg-base-100 py-[18px] px-[22px] rounded-lg my-3"
              >
                Share your suggestions!
              </motion.span>
            )}
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`max-h-[300px] overflow-y-auto overflow-x-hidden flex flex-col min-h-[130px] px-2 ${
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
