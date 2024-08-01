import { CheckCircleIcon } from "@heroicons/react/24/outline";
import type { FinalizeTechListItemProps, Vote, SelectedItems } from "./types";
import Button from "@/components/Button";
import AvatarGroup from "@/components/avatar/AvatarGroup";
import Avatar from "@/components/avatar/Avatar";

export default function FinalizeTechListItem({
  title,
  techItemVotes,
  categoryId,
  techId,
  selectedItems,
  setSelectedItems,
}: FinalizeTechListItemProps) {
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
