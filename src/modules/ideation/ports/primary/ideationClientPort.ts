import { type AddIdeationUsecaseDto } from "@/modules/ideation/application/dtos/addIdeationUsecaseDto";
import { type AddIdeationResponseDto } from "@/modules/ideation/application/dtos/response.dto";

export interface IdeationClientPort {
  addIdeation({
    teamId,
    title,
    description,
    vision,
  }: AddIdeationUsecaseDto): Promise<AddIdeationResponseDto>;
}
