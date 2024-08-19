import { getDifferentObject } from "./getDifferentObject";
import type { SelectedItems } from "@/app/(main)/my-voyage/[teamId]/tech-stack/finalize/types";

export default function editFinalList(
  previousSelected: SelectedItems,
  selectedItems: SelectedItems,
) {
  const finalList = [];

  const differences = getDifferentObject({
    prev: previousSelected as { [key: number]: number },
    curr: selectedItems as { [key: number]: number },
  });

  for (const diff of differences) {
    finalList.push({
      categoryId: diff.key,
      techs: [
        {
          techId: diff.currentValue,
          isSelected: true,
        },
        {
          techId: diff.previousValue,
          isSelected: false,
        },
      ],
    });
  }

  return finalList;
}
