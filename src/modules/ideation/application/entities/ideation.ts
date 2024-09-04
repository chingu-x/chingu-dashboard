import { type IdeationVotes } from "./ideationVotes";
import { type VoyageMember } from "@/store/features/ideation/ideationSlice";

// importing the voyage member from the store for now but it would ideally be imported from a different domain in modules folder
export interface Ideation {
  id: number;
  title: string;
  description: string;
  vision: string;
  isSelected: boolean;
  createdAt: Date;
  updatedAt: Date;
  contributedBy: {
    member: VoyageMember;
  };
  projectIdeaVotes: IdeationVotes[];
}
