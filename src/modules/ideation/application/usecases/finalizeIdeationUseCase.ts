import { inject } from "tsyringe";
import { TYPES } from "@/di/types";
import { type IdeationApiPort } from "@/modules/ideation/ports/secondary/ideationApiPort";
import { type FinalizeIdeationRequestDto } from "@/modules/ideation/application/dtos/request.dto";
import { type FinalizeIdeationResponseDto } from "@/modules/ideation/application/dtos/response.dto";

export class FinalizeIdeationUseCase {
  constructor(
    @inject(TYPES.IdeationApiPort)
    private readonly ideationApi: IdeationApiPort,
  ) {}

  async execute(
    props: FinalizeIdeationRequestDto,
  ): Promise<FinalizeIdeationResponseDto> {
    return await this.ideationApi.finalizeIdeation({
      ...props,
    });
  }
}
