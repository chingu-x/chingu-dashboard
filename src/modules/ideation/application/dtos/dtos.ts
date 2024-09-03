import type {
  IdeationBodyDto,
  IdeationRequestDto,
} from "@/modules/ideation/infrastructure/dtos/common.dto";

export interface AddIdeationUsecaseDto
  extends Pick<IdeationRequestDto, "teamId">,
    IdeationBodyDto {}
