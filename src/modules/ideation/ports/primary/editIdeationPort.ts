import { type EditIdeationRequestDto } from "@/modules/ideation/application/dtos/request.dto";
import { type EditIdeationResponseDto } from "@/modules/ideation/application/dtos/response.dto";

export interface EditIdeationPort {
  execute(props: EditIdeationRequestDto): Promise<EditIdeationResponseDto>;
}