import { inject } from "tsyringe";
import { TYPES } from "@/di/types";
import { type IdeationApiRepository } from "@/modules/ideation/domain/ports/ideationApiRepository";
import { type DeleteIdeationRequestDto } from "@/modules/ideation/infrastructure/dtos/request.dto";
import { type DeleteIdeationResponseDto } from "@/modules/ideation/infrastructure/dtos/response.dto";

export class DeleteIdeationUseCase {
  constructor(
    @inject(TYPES.IdeationApiRepository)
    private readonly ideationApiRepository: IdeationApiRepository,
  ) {}

  async execute(
    props: DeleteIdeationRequestDto,
  ): Promise<DeleteIdeationResponseDto> {
    return await this.ideationApiRepository.deleteIdeation({
      ...props,
    });
  }
}
