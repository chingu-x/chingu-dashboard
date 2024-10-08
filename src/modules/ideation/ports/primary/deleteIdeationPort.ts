import { type DeleteIdeationRequestDto } from "@/modules/ideation/application/dtos/request.dto";
import { type DeleteIdeationResponseDto } from "@/modules/ideation/application/dtos/response.dto";

export interface DeleteIdeationPort {
  execute(props: DeleteIdeationRequestDto): Promise<DeleteIdeationResponseDto>;
}
