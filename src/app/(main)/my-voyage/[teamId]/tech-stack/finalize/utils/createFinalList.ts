import { getDifferentObject } from "./getDifferentObject";
import type { SelectedItems } from "@/app/(main)/my-voyage/[teamId]/tech-stack/finalize/types";

function createFinalList(
  previousSelected: SelectedItems,
  selectedItems: SelectedItems,
) {
  const finalList = [];
  const keys = Object.keys(selectedItems);

  const differences = getDifferentObject({
    prev: previousSelected as { [key: number]: number },
    curr: selectedItems as { [key: number]: number },
  });

  for (let i = 0; i < keys.length; i++) {
    const key = Number(keys[i]);
    if (selectedItems[key as keyof SelectedItems]) {
      finalList.push({
        categoryId: key,
        techs: [
          {
            techId: selectedItems[key as keyof SelectedItems],
            isSelected: true,
          },
        ],
      });
    }
  }

  for (const diff of differences) {
    finalList.push({
      categoryId: diff.key,
      techs: [
        {
          techId: diff.previousValue,
          isSelected: false,
        },
      ],
    });
  }

  return finalList;
}

export default createFinalList;
