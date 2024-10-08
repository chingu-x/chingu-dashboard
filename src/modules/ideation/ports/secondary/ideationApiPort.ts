import type {
  AddIdeationRequestDto,
  DeleteIdeationRequestDto,
  EditIdeationRequestDto,
  FinalizeIdeationRequestDto,
  IdeationVoteRequestDto,
} from "@/modules/ideation/application/dtos/request.dto";

import type {
  AddIdeationResponseDto,
  DeleteIdeationResponseDto,
  EditIdeationResponseDto,
  FinalizeIdeationResponseDto,
  IdeationVoteResponseDto,
} from "@/modules/ideation/application/dtos/response.dto";

export interface IdeationApiPort {
  addIdeation: (
    props: AddIdeationRequestDto,
  ) => Promise<AddIdeationResponseDto>;
  editIdeation: (
    props: EditIdeationRequestDto,
  ) => Promise<EditIdeationResponseDto>;
  deleteIdeation: (
    props: DeleteIdeationRequestDto,
  ) => Promise<DeleteIdeationResponseDto>;
  addIdeationVote: (
    props: IdeationVoteRequestDto,
  ) => Promise<IdeationVoteResponseDto>;
  removeIdeationVote: (
    props: IdeationVoteRequestDto,
  ) => Promise<IdeationVoteResponseDto>;
  finalizeIdeation: (
    props: FinalizeIdeationRequestDto,
  ) => Promise<FinalizeIdeationResponseDto>;
}
