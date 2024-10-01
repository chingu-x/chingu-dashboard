import { type AddIdeationResponseDto } from "@/modules/ideation/application/dtos/response.dto";
import { type AddIdeationRequestDto } from "@/modules/ideation/application/dtos/request.dto";

export interface IdeationClientPort {
  addIdeation({
    teamId,
    title,
    description,
    vision,
  }: AddIdeationRequestDto): Promise<AddIdeationResponseDto>;
}
