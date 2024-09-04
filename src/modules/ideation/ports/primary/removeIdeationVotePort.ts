import { type IdeationVoteRequestDto } from "@/modules/ideation/application/dtos/request.dto";
import { type IdeationVoteResponseDto } from "@/modules/ideation/application/dtos/response.dto";

export interface RemoveIdeationVotePort {
  removeIdeationVote(
    props: IdeationVoteRequestDto,
  ): Promise<IdeationVoteResponseDto>;
}
