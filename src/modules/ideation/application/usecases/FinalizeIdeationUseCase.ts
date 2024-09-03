import { inject } from "tsyringe";
import { TYPES } from "@/di/types";
import { type IdeationApiRepository } from "@/modules/ideation/domain/ports/ideationApiRepository";
import { type FinalizeIdeationRequestDto } from "@/modules/ideation/domain/dtos/request.dto";
import { type FinalizeIdeationResponseDto } from "@/modules/ideation/domain/dtos/response.dto";

export class FinalizeIdeationUseCase {
  constructor(
    @inject(TYPES.IdeationApiRepository)
    private readonly ideationApiRepository: IdeationApiRepository,
  ) {}

  async execute(
    props: FinalizeIdeationRequestDto,
  ): Promise<FinalizeIdeationResponseDto> {
    return await this.ideationApiRepository.finalizeIdeation({
      ...props,
    });
  }
}
