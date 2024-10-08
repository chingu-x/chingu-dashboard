import { type IdeationClientPort } from "@/modules/ideation/ports/primary/ideationClientPort";
import { type AddIdeationResponseDto } from "@/modules/ideation/application/dtos/response.dto";
import { AddIdeationUseCase } from "@/modules/ideation/application/usecases/addIdeationUseCase";
import { NextJsRestApiAdapter } from "@/modules/restApi/adapters/secondary/nextJsRestApiAdapter";
import { IdeationApiAdapter } from "@/modules/ideation/adapters/secondary/ideationApiAdapter";
import { type AddIdeationRequestDto } from "@/modules/ideation/application/dtos/request.dto";

const nextJsRestApiAdapter = new NextJsRestApiAdapter(
  process.env.NEXT_PUBLIC_API_URL!,
);
const ideationApiPort = new IdeationApiAdapter(nextJsRestApiAdapter);

export class IdeationClientAdapter implements IdeationClientPort {
  async addIdeation({
    teamId,
    title,
    description,
    vision,
    token,
    cache,
  }: Required<AddIdeationRequestDto>): Promise<AddIdeationResponseDto> {
    const addIdeationUseCase = new AddIdeationUseCase(ideationApiPort);

    // refactor this later to not expect a function
    return await addIdeationUseCase.execute({
      teamId,
      title,
      description,
      vision,
      cache,
      token,
    });
  }
}
