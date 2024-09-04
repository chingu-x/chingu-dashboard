import { type VoyageMember } from "@/store/features/ideation/ideationSlice";

// importing the voyage member from the store for now but it would ideally be imported from a different domain in modules folder
export interface IdeationVotes {
  id: number;
  voyageTeamMemberId: number;
  projectIdeaId: number;
  createdAt: Date;
  updatedAt: Date;
  votedBy: {
    member: VoyageMember;
  };
}
