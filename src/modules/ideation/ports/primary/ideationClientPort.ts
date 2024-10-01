import { type AddIdeationUsecaseDto } from "@/modules/ideation/application/dtos/addIdeationUsecaseDto";
import { type AsyncActionResponse } from "@/modules/shared/types";
import { type AddIdeationResponseDto } from "@/modules/ideation/application/dtos/response.dto";

export interface IdeationClientPort {
  addIdeation({
    teamId,
    title,
    description,
    vision,
  }: AddIdeationUsecaseDto): Promise<
    AsyncActionResponse<AddIdeationResponseDto>
  >;
}
