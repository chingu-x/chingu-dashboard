"use client";
import GetIcon from "@/myVoyage/tech-stack/components/GetIcons";
import Button from "@/components/Button";
import { useTechStack } from "@/store/hooks";
import FinalizeTechListItem from "@/app/(main)/my-voyage/[teamId]/tech-stack/finalize/FinalizeTechListItem";
import ConfirmationButton from "@/app/(main)/my-voyage/[teamId]/tech-stack/finalize/ConfirmationButton";

export interface FinalizeTechStack {
  id: number;
  title: string;
}

export default function FinalizeTechList() {
  const { techStack } = useTechStack();

  return (
    <>
      {techStack.map((item) => (
        <div
          key={item.id}
          className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-base-100 p-10 [&>*]:my-3 [&>*]:w-3/4"
        >
          <h1 className="flex items-center">
            {GetIcon(item.name)}
            {item.name}
          </h1>
          {item.teamTechStackItems.map((techItem) => {
            const { id, name, teamTechStackItemVotes, isSelected } = techItem;
            return (
              <FinalizeTechListItem
                key={id}
                title={name}
                techId={id}
                techItemVotes={teamTechStackItemVotes}
                isSelected={isSelected}
              />
            );
          })}
        </div>
      ))}
      <ConfirmationButton />
      <Button variant="neutral">Cancel</Button>
    </>
  );
}
