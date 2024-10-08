import { inject } from "tsyringe";
import { TYPES } from "@/di/types";
import { type IdeationApiPort } from "@/modules/ideation/ports/secondary/ideationApiPort";
import { type IdeationVoteRequestDto } from "@/modules/ideation/application/dtos/request.dto";
import { type IdeationVoteResponseDto } from "@/modules/ideation/application/dtos/response.dto";

export class RemoveIdeationVoteUseCase {
  constructor(
    @inject(TYPES.IdeationApiPort)
    private readonly ideationApi: IdeationApiPort,
  ) {}

  async execute(
    props: IdeationVoteRequestDto,
  ): Promise<IdeationVoteResponseDto> {
    return await this.ideationApi.removeIdeationVote({
      ...props,
    });
  }
}
