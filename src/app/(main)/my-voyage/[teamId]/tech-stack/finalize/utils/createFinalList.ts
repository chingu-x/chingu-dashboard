import type { SelectedItems } from "@/app/(main)/my-voyage/[teamId]/tech-stack/finalize/types";

function createFinalList(selectedItems: SelectedItems) {
  const finalList = [];
  const keys = Object.keys(selectedItems);

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

  return finalList;
}

export default createFinalList;
