import type { IdeationBody } from "./IdeationBody";

export interface IdeationResponse {
  id: number;
  voyageTeamMemberId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddIdeationResponse extends IdeationResponse, IdeationBody {}

export interface EditIdeationResponse extends AddIdeationResponse {}

export interface DeleteIdeationResponse extends AddIdeationResponse {}

export interface FinalizeIdeationResponse
  extends IdeationResponse,
    IdeationBody {
  isSelected: boolean;
}

export interface IdeationVoteResponse extends IdeationResponse {
  projectIdeaId: number;
}
