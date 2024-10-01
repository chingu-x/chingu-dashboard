import { inject } from "tsyringe";
import { TYPES } from "@/di/types";
import { type IdeationVoteRequestDto } from "@/modules/ideation/application/dtos/request.dto";
import { type IdeationVoteResponseDto } from "@/modules/ideation/application/dtos/response.dto";
import { type IdeationApiPort } from "@/modules/ideation/ports/secondary/ideationApiPort";

export class AddIdeationVoteUseCase {
  constructor(
    @inject(TYPES.IdeationApiPort)
    private readonly ideationApi: IdeationApiPort,
  ) {}

  async execute(
    props: IdeationVoteRequestDto,
  ): Promise<IdeationVoteResponseDto> {
    return await this.ideationApi.addIdeationVote({
      ...props,
    });
  }
}