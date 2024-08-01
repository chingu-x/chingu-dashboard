import type { SelectedItems } from "@/app/(main)/my-voyage/[teamId]/tech-stack/finalize/types";

function createFinalList(object: SelectedItems) {
  const finalList = [];
  const keys = Object.keys(object);

  for (let i = 0; i < keys.length; i++) {
    const key = Number(keys[i]);
    if (object[key as keyof SelectedItems]) {
      finalList.push({
        categoryId: key,
        techs: [
          { techId: object[key as keyof SelectedItems], isSelected: true },
        ],
      });
    }
  }

  return finalList;
}

export default createFinalList;
