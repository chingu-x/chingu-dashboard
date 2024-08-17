import { useEffect, useRef } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import type {
  FinalizeTechCardProps,
  Vote,
  SelectedItems,
  FinalizedItem,
} from "./types";
import Button from "@/components/Button";
import AvatarGroup from "@/components/avatar/AvatarGroup";
import Avatar from "@/components/avatar/Avatar";

export default function FinalizeTechCard({
  title,
  techItemVotes,
  categoryId,
  techId,
  selectedItems,
  setSelectedItems,
  setPreviousSelected,
  finalizedItems,
}: FinalizeTechCardProps) {
  const hasMounted = useRef(false);

  const handleSelect = () => {
    if (selectedItems[categoryId as keyof SelectedItems] === techId) {
      setSelectedItems((selectedItems: SelectedItems) => ({
        ...selectedItems,
        [categoryId]: null,
      }));
    } else {
      setSelectedItems((selectedItems: SelectedItems) => ({
        ...selectedItems,
        [categoryId]: techId,
      }));
    }
  };

  //if editing the 'selectedItems' variable needs to be set to contain the
  // finalized list. This useEffect makes sure that happens. *ref is used because linting error required
  // dependencies but dependencies caused loop. The ref is used to workaround that.
  useEffect(() => {
    if (!hasMounted.current) {
      if (finalizedItems) {
        let update = {};
        for (let i = 0; i < finalizedItems.length; i++) {
          const key = finalizedItems[i].id;
          const value = finalizedItems[i].techItems[0].id;
          update = { ...update, [key as keyof FinalizedItem[]]: value };
        }
        setPreviousSelected(update);
        setSelectedItems(update);
      }
    }
    hasMounted.current = true;
  }, [finalizedItems, setSelectedItems, setPreviousSelected]);

  return (
    <Button
      variant={
        selectedItems[categoryId as keyof SelectedItems] === techId
          ? "primary"
          : "outline"
      }
      className="gap-x-0"
      aria-label="Finalized Project Idea"
      onClick={handleSelect}
    >
      <div className="flex w-full flex-col items-center justify-center gap-y-2">
        <h2 className="text-base font-semibold">{title}</h2>
        <AvatarGroup>
          {techItemVotes.map((vote: Vote) => (
            <Avatar
              key={vote.votedBy.member.id}
              image={vote.votedBy.member.avatar}
              width={24}
              height={24}
            />
          ))}
        </AvatarGroup>
      </div>
      <div className="h-6 w-6">
        {selectedItems[categoryId as keyof SelectedItems] === techId && (
          <CheckCircleIcon />
        )}
      </div>
    </Button>
  );
}
