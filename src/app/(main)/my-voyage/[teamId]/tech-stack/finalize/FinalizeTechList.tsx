"use client";

import { useState } from "react";
import type { SelectedItems, TechItem, TechStackItem } from "./types";
import GetIcon from "@/myVoyage/tech-stack/components/GetIcons";
import Button from "@/components/Button";
import { useTechStack } from "@/store/hooks";
import FinalizeTechCard from "@/app/(main)/my-voyage/[teamId]/tech-stack/finalize/FinalizeTechCard";
import ConfirmationButton from "@/app/(main)/my-voyage/[teamId]/tech-stack/finalize/ConfirmationButton";

export default function FinalizeTechList() {
  const { techStack } = useTechStack();
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});

  const renderTechStackItem = (item: TechStackItem) => {
    if (item.teamTechStackItems.length === 0) {
      return null;
    }

    return (
      <div
        key={item.id}
        className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-base-100 p-10 [&>*]:my-3 [&>*]:w-3/4"
      >
        <h1 className="flex items-center">
          {GetIcon(item.name)}
          {item.name}
        </h1>
        {item.teamTechStackItems.map((techItem: TechItem) => {
          const { id, name, teamTechStackItemVotes } = techItem;
          return (
            <FinalizeTechCard
              categoryId={item.id}
              key={id}
              title={name}
              techId={id}
              techItemVotes={teamTechStackItemVotes}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      {techStack.map(renderTechStackItem)}
      <ConfirmationButton selectedItems={selectedItems} />
      <Button variant="neutral">Cancel</Button>
    </>
  );
}
