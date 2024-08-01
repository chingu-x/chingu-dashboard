"use client";

import { useState } from "react";
import type { SelectedItems } from "./types";
import GetIcon from "@/myVoyage/tech-stack/components/GetIcons";
import Button from "@/components/Button";
import { useTechStack } from "@/store/hooks";
import FinalizeTechListItem from "@/app/(main)/my-voyage/[teamId]/tech-stack/finalize/FinalizeTechListItem";
import ConfirmationButton from "@/app/(main)/my-voyage/[teamId]/tech-stack/finalize/ConfirmationButton";

export default function FinalizeTechList() {
  const { techStack } = useTechStack();
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});

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
            const { id, name, teamTechStackItemVotes } = techItem;
            return (
              <FinalizeTechListItem
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
      ))}
      <ConfirmationButton selectedItems={selectedItems} />
      <Button variant="neutral">Cancel</Button>
    </>
  );
}
