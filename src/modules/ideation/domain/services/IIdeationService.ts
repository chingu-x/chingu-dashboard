import type {
  AddIdeationProps,
  DeleteIdeationProps,
  EditIdeationProps,
  FinalizeIdeationProps,
  IdeationVoteProps,
} from "@/modules/ideation/domain/IdeationProps";
import type {
  AddIdeationResponse,
  DeleteIdeationResponse,
  EditIdeationResponse,
  FinalizeIdeationResponse,
  IdeationVoteResponse,
} from "@/modules/ideation/domain/IdeationResponse";
import type { AsyncActionResponse } from "@/utils/handleAsync";

export interface IIdeationService {
  addIdeation: (
    props: AddIdeationProps,
  ) => Promise<AsyncActionResponse<AddIdeationResponse>>;
  editIdeation: (
    props: EditIdeationProps,
  ) => Promise<AsyncActionResponse<EditIdeationResponse>>;
  deleteIdeation: (
    props: DeleteIdeationProps,
  ) => Promise<AsyncActionResponse<DeleteIdeationResponse>>;
  addIdeationVote: (
    props: IdeationVoteProps,
  ) => Promise<AsyncActionResponse<IdeationVoteResponse>>;
  removeIdeationVote: (
    props: IdeationVoteProps,
  ) => Promise<AsyncActionResponse<IdeationVoteResponse>>;
  finalizeIdeation: (
    props: FinalizeIdeationProps,
  ) => Promise<AsyncActionResponse<FinalizeIdeationResponse>>;
}
