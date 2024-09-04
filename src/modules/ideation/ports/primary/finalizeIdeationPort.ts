import { type FinalizeIdeationRequestDto } from "@/modules/ideation/application/dtos/request.dto";
import { type FinalizeIdeationResponseDto } from "@/modules/ideation/application/dtos/response.dto";

export interface FinalizeIdeationPort {
  finalizeIdeation(
    props: FinalizeIdeationRequestDto,
  ): Promise<FinalizeIdeationResponseDto>;
}
