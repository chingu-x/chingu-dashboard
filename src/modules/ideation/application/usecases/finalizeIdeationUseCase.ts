import { inject } from "tsyringe";
import { TYPES } from "@/di/types";
import { type IdeationApiPort } from "@/modules/ideation/ports/secondary/ideationApiPort";
import { type FinalizeIdeationRequestDto } from "@/modules/ideation/application/dtos/request.dto";
import { type FinalizeIdeationResponseDto } from "@/modules/ideation/application/dtos/response.dto";
import { type FinalizeIdeationPort } from "@/modules/ideation/ports/primary/finalizeIdeationPort";

export class FinalizeIdeationUseCase implements FinalizeIdeationPort {
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
