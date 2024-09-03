import { inject } from "tsyringe";
import { TYPES } from "@/di/types";

import { type IdeationApiRepository } from "@/modules/ideation/domain/ports/ideationApiRepository";
import { type EditIdeationRequestDto } from "@/modules/ideation/infrastructure/dtos/request.dto";
import { type EditIdeationResponseDto } from "@/modules/ideation/infrastructure/dtos/response.dto";

export class EditIdeationUseCase {
  constructor(
    @inject(TYPES.IdeationApiRepository)
    private readonly ideationApiRepository: IdeationApiRepository,
  ) {}

  async execute(
    props: EditIdeationRequestDto,
  ): Promise<EditIdeationResponseDto> {
    return await this.ideationApiRepository.editIdeation({
      ...props,
    });
  }
}
