import { inject, injectable } from "tsyringe";
import { TYPES } from "@/di/types";
import { type IdeationApiPort } from "@/modules/ideation/ports/secondary/ideationApiPort";
import { type AddIdeationRequestDto } from "@/modules/ideation/application/dtos/request.dto";
import { type AddIdeationResponseDto } from "@/modules/ideation/application/dtos/response.dto";
import { type AddIdeationPort } from "@/modules/ideation/ports/primary/addIdeationPort";

@injectable()
export class AddIdeationUseCase implements AddIdeationPort {
  constructor(
    @inject(TYPES.IdeationApiPort)
    private readonly ideationApi: IdeationApiPort,
  ) {}

  async execute(props: AddIdeationRequestDto): Promise<AddIdeationResponseDto> {
    return await this.ideationApi.addIdeation({
      ...props,
    });
  }
}
