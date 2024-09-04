import type { AddIdeationRequestDto } from "@/modules/ideation/application/dtos/request.dto";
import type { AddIdeationResponseDto } from "@/modules/ideation/application/dtos/response.dto";

export interface AddIdeationPort {
  execute(props: AddIdeationRequestDto): Promise<AddIdeationResponseDto>;
}
