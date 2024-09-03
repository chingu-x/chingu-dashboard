import { type IdeationBodyDto } from "./common.dto";

interface IdeationResponseDto {
  id: number;
  voyageTeamMemberId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface AddIdeationResponseDto extends IdeationResponseDto, IdeationBodyDto {}

interface EditIdeationResponseDto extends AddIdeationResponseDto {}

interface DeleteIdeationResponseDto extends AddIdeationResponseDto {}

interface FinalizeIdeationResponseDto
  extends IdeationResponseDto,
    IdeationBodyDto {
  isSelected: boolean;
}

interface IdeationVoteResponseDto extends IdeationResponseDto {
  projectIdeaId: number;
}
