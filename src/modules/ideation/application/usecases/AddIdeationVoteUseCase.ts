import { inject } from "tsyringe";
import { TYPES } from "@/di/types";
import { type IdeationApiRepository } from "@/modules/ideation/domain/ports/ideationApiRepository";
import { type IdeationVoteRequestDto } from "@/modules/ideation/infrastructure/dtos/request.dto";
import { type IdeationVoteResponseDto } from "@/modules/ideation/infrastructure/dtos/response.dto";

export class AddIdeationVoteUseCase {
  constructor(
    @inject(TYPES.IdeationApiRepository)
    private readonly ideationApiRepository: IdeationApiRepository,
  ) {}

  async execute(
    props: IdeationVoteRequestDto,
  ): Promise<IdeationVoteResponseDto> {
    return await this.ideationApiRepository.addIdeationVote({
      ...props,
    });
  }
}
