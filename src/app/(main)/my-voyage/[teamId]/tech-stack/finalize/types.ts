import type { Key } from "react";
import type { TechStackItemVotes } from "@/store/features/techStack/techStackSlice";

export interface FinalizeTechStackPageProps {
  params: {
    teamId: string;
  };
}

export type SelectedItems = object | { [key: number]: number };
export interface FinalizeTechCardProps {
  title: string;
  techItemVotes: TechStackItemVotes[];
  categoryId: number;
  techId: number;
  selectedItems: SelectedItems;
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItems>>;
}

export type Vote = {
  votedBy: {
    member: {
      id: Key | null | undefined;
      avatar: string;
    };
  };
};

export type Tech = {
  techId: number;
  isSelected: boolean;
};

export type Category = {
  categoryId: number;
  techs: Tech[];
};

export interface TechItem {
  id: number;
  name: string;
  teamTechStackItemVotes: TechStackItemVotes[];
}

export interface TechStackItem {
  id: number;
  name: string;
  teamTechStackItems: TechItem[];
}

export type setFinalizedListArgs = Category;

export interface ConfirmationButtonProps {
  allCategoriesSelected: boolean;
  selectedItems: SelectedItems;
}
