import { inject } from "tsyringe";
import { TYPES } from "@/di/types";
import { type DeleteIdeationRequestDto } from "@/modules/ideation/application/dtos/request.dto";
import { type DeleteIdeationResponseDto } from "@/modules/ideation/application/dtos/response.dto";
import { type IdeationApiPort } from "@/modules/ideation/ports/secondary/ideationApiPort";
import { type DeleteIdeationPort } from "@/modules/ideation/ports/primary/deleteIdeationPort";

export class DeleteIdeationUseCase implements DeleteIdeationPort {
  constructor(
    @inject(TYPES.IdeationApiPort)
    private readonly ideationApi: IdeationApiPort,
  ) {}

  async execute(
    props: DeleteIdeationRequestDto,
  ): Promise<DeleteIdeationResponseDto> {
    return await this.ideationApi.deleteIdeation({
      ...props,
    });
  }
}
