import type {
  IdeationBodyDto,
  IdeationRequestDto,
} from "@/modules/ideation/application/dtos/common.dto";

export interface AddIdeationUsecaseDto
  extends Pick<IdeationRequestDto, "teamId">,
    IdeationBodyDto {}
