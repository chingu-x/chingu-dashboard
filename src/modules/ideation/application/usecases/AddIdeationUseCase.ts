import { inject } from "tsyringe";
import { TYPES } from "@/di/types";
import { type IdeationApiRepository } from "@/modules/ideation/domain/ports/ideationApiRepository";
import { type AddIdeationRequestDto } from "@/modules/ideation/domain/dtos/request.dto";
import { type AddIdeationResponseDto } from "@/modules/ideation/domain/dtos/response.dto";

export class AddIdeationUseCase {
  constructor(
    @inject(TYPES.IdeationApiRepository)
    private readonly ideationApiRepository: IdeationApiRepository,
  ) {}

  async execute(props: AddIdeationRequestDto): Promise<AddIdeationResponseDto> {
    return await this.ideationApiRepository.addIdeation({
      ...props,
    });
  }
}
