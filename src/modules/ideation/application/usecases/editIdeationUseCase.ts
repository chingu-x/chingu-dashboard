import { inject } from "tsyringe";
import { TYPES } from "@/di/types";
import { type IdeationApiPort } from "@/modules/ideation/ports/secondary/ideationApiPort";
import { type EditIdeationRequestDto } from "@/modules/ideation/application/dtos/request.dto";
import { type EditIdeationResponseDto } from "@/modules/ideation/application/dtos/response.dto";

export class EditIdeationUseCase {
  constructor(
    @inject(TYPES.IdeationApiPort)
    private readonly ideationApi: IdeationApiPort,
  ) {}

  async execute(
    props: EditIdeationRequestDto,
  ): Promise<EditIdeationResponseDto> {
    return await this.ideationApi.editIdeation({
      ...props,
    });
  }
}
