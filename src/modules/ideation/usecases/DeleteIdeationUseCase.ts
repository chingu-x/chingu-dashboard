"use server";

import { inject } from "tsyringe";
import { revalidateTag } from "next/cache";
import type { DeleteIdeationProps } from "@/modules/ideation/domain/IdeationProps";
import type { DeleteIdeationResponse } from "@/modules/ideation/domain/IdeationResponse";
import { type IIdeationService } from "@/modules/ideation/domain/services/IIdeationService";
import { TYPES } from "@/di/types";
import type { AsyncActionResponse } from "@/utils/handleAsync";
import { getAccessToken } from "@/utils/getCookie";
import { CacheTag } from "@/utils/cacheTag";

export class DeleteIdeationUseCase {
  constructor(
    @inject(TYPES.IIdeationService)
    private readonly ideationService: IIdeationService,
  ) {}

  /**
   * Executes the use case to delete an ideation.
   *
   * @param {DeleteIdeationProps} props - The properties required to delete an ideation.
   * @returns {Promise<AsyncActionResponse<DeleteIdeationResponse>>} - The response from the deleteIdeation method.
   */
  async execute(
    props: DeleteIdeationProps,
  ): Promise<AsyncActionResponse<DeleteIdeationResponse>> {
    const token = getAccessToken();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      throw new Error("Base URL is not defined");
    }

    const [res, error] = await this.ideationService.deleteIdeation({
      ...props,
      token,
      baseUrl,
    });

    if (res) {
      revalidateTag(CacheTag.ideation);
    }

    return [res, error];
  }
}
