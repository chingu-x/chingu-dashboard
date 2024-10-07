"use server";

import { inject } from "tsyringe";
import { revalidateTag } from "next/cache";
import type { FinalizeIdeationProps } from "@/modules/ideation/domain/IdeationProps";
import type { FinalizeIdeationResponse } from "@/modules/ideation/domain/IdeationResponse";
import { type IIdeationService } from "@/modules/ideation/domain/services/IIdeationService";
import { TYPES } from "@/di/types";
import type { AsyncActionResponse } from "@/utils/handleAsync";
import { getAccessToken } from "@/utils/getCookie";
import { CacheTag } from "@/utils/cacheTag";

export class FinalizeIdeationUseCase {
  constructor(
    @inject(TYPES.IIdeationService)
    private readonly ideationService: IIdeationService,
  ) {}

  /**
   * Executes the use case to finalize an ideation.
   *
   * @param {FinalizeIdeationProps} props - The properties required to finalize an ideation.
   * @returns {Promise<AsyncActionResponse<FinalizeIdeationResponse>>} - The response from the finalizeIdeation method.
   */
  async execute(
    props: FinalizeIdeationProps,
  ): Promise<AsyncActionResponse<FinalizeIdeationResponse>> {
    const token = getAccessToken();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      throw new Error("Base URL is not defined");
    }

    const [res, error] = await this.ideationService.finalizeIdeation({
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
