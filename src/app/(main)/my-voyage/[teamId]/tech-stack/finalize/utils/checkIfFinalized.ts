import { getSelectedTechItems } from "./getSelectedTechItems";
import type { TechStackData } from "@/store/features/techStack/techStackSlice";

export function checkIfFinalized(data: TechStackData[]) {
  const techCardData = data.map((item) => ({
    id: item.id,
    title: item.name,
    techItems: item.teamTechStackItems,
  }));
  const selectedTechItems = getSelectedTechItems(techCardData);

  return selectedTechItems.length > 0;
}
