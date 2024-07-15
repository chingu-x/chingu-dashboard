import { Draggable, type DraggableProvided } from "@hello-pangea/dnd";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { type Feature } from "./fixtures/Features";
import EditPopover from "./EditPopover";
import { useUser } from "@/store/hooks";
import Avatar from "@/components/avatar/AvatarAlt";

interface CardProps {
  feature: Feature;
  index: number;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

export default function Card({ feature, index, setEditMode }: CardProps) {
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const userId = useUser().id;
  const {
    id,
    addedBy: {
      member: { id: addedById, firstName, lastName, avatar },
    },
    description,
  } = feature;
  const isCurrentUser = userId === addedById;

  function handleClick() {
    setShowPopover(true);
  }

  function handleOutsideClick(e: MouseEvent | TouchEvent) {
    if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
      setShowPopover(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  return (
    <Draggable draggableId={feature.id.toString()} index={index}>
      {(provided: DraggableProvided) => (
        <div ref={cardRef}>
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="relative my-3 rounded-lg bg-base-100 px-[22px] py-[14px] text-base-300"
          >
            {showPopover && (
              <EditPopover
                setEditMode={setEditMode}
                setShowPopover={setShowPopover}
                featureId={id}
              />
            )}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-y-1">
                <span className="text-base font-semibold">{description}</span>
                <span className="text-[10px] text-neutral-focus">{`Added by ${
                  isCurrentUser ? "you" : firstName + " " + lastName
                }`}</span>
              </div>
              {isCurrentUser ? (
                // Edit Button
                <button
                  type="button"
                  onClick={handleClick}
                  className="flex items-center justify-end w-12 h-10 p-0 m-0 bg-transparent border-none gap-x-0 hover:bg-transparent"
                  aria-label="feature menu"
                >
                  <EllipsisVerticalIcon className="w-5 h-5 text-base-300" />
                </button>
              ) : (
                // Creator's avatar
                <Avatar
                  firstName={firstName}
                  lastName={lastName}
                  avatarUrl={avatar}
                  size="xl"
                />
              )}
            </div>
          </li>
        </div>
      )}
    </Draggable>
  );
}
