import { type IdeationRequestDto, type IdeationBodyDto } from "./common.dto";

interface AddIdeationBodyDto extends IdeationBodyDto {}

interface EditIdeationBodyDto extends Partial<AddIdeationBodyDto> {}

interface AddIdeationRequestDto
  extends Pick<IdeationRequestDto, "teamId">,
    IdeationBodyDto {}

type EditIdeationRequestDto = EditIdeationBodyDto &
  Omit<IdeationRequestDto, "teamId">;

type DeleteIdeationRequestDto = Omit<IdeationRequestDto, "teamId">;

type IdeationVoteRequestDto = Omit<IdeationRequestDto, "teamId">;
type FetchIdeationsRequestDto = Pick<IdeationRequestDto, "teamId">;

interface FinalizeIdeationRequestDto extends IdeationRequestDto {}
