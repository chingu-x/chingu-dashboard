import { type FinalizeIdeationRequestDto } from "@/modules/ideation/application/dtos/request.dto";
import { type FinalizeIdeationResponseDto } from "@/modules/ideation/application/dtos/response.dto";

export interface FinalizeIdeationPort {
  execute(
    props: FinalizeIdeationRequestDto,
  ): Promise<FinalizeIdeationResponseDto>;
}
