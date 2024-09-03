import { type IdeationBodyDto } from "./common.dto";

interface IdeationResponseDto {
  id: number;
  voyageTeamMemberId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddIdeationResponseDto
  extends IdeationResponseDto,
    IdeationBodyDto {}

export interface EditIdeationResponseDto extends AddIdeationResponseDto {}

export interface DeleteIdeationResponseDto extends AddIdeationResponseDto {}

export interface IdeationVoteResponseDto extends IdeationResponseDto {
  projectIdeaId: number;
}

export interface FinalizeIdeationResponseDto
  extends IdeationResponseDto,
    IdeationBodyDto {
  isSelected: boolean;
}
