import { inject } from "tsyringe";
import { TYPES } from "@/di/types";
import { type DeleteIdeationRequestDto } from "@/modules/ideation/application/dtos/request.dto";
import { type DeleteIdeationResponseDto } from "@/modules/ideation/application/dtos/response.dto";
import { type IdeationApiPort } from "@/modules/ideation/ports/secondary/ideationApiPort";

export class DeleteIdeationUseCase {
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
