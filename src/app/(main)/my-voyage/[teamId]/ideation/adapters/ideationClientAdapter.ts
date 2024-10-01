import { revalidateTag } from "next/cache";
import { type IdeationClientPort } from "@/modules/ideation/ports/primary/ideationClientPort";
import { type AddIdeationUsecaseDto } from "@/modules/ideation/application/dtos/addIdeationUsecaseDto";
import { handleAsync } from "@/utils/handleAsync";
import { type AsyncActionResponse } from "@/modules/shared/types";
import { type AddIdeationResponseDto } from "@/modules/ideation/application/dtos/response.dto";
import { AddIdeationUseCase } from "@/modules/ideation/application/usecases/addIdeationUseCase";
import { getAccessToken } from "@/utils/getCookie";
import { NextJsRestApiAdapter } from "@/modules/restApi/adapters/secondary/nextJsRestApiAdapter";
import { IdeationApiAdapter } from "@/modules/ideation/adapters/secondary/ideationApiAdapter";
import { CacheTag } from "@/utils/cacheTag";

const nextJsRestApiAdapter = new NextJsRestApiAdapter(
  process.env.NEXT_PUBLIC_API_URL!,
);
const ideationApiPort = new IdeationApiAdapter(nextJsRestApiAdapter);

export class IdeationClientAdapter implements IdeationClientPort {
  constructor() {}

  async addIdeation({
    teamId,
    title,
    description,
    vision,
  }: AddIdeationUsecaseDto): Promise<
    AsyncActionResponse<AddIdeationResponseDto>
  > {
    const token = getAccessToken();
    const addIdeationUseCase = new AddIdeationUseCase(ideationApiPort);

    // refactor this later to not expect a function
    const addIdeationAsync = async () =>
      await addIdeationUseCase.execute({
        teamId,
        title,
        description,
        vision,
        cache: "default",
        token,
      });

    const [res, error] =
      await handleAsync<AddIdeationResponseDto>(addIdeationAsync);

    if (res) {
      revalidateTag(CacheTag.ideation);
    }

    return [res, error];
  }
}
