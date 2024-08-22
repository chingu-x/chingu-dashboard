"use server";

import { inject } from "tsyringe";
import { revalidateTag } from "next/cache";
import type { AddIdeationProps } from "@/modules/ideation/domain/IdeationProps";
import type { AddIdeationResponse } from "@/modules/ideation/domain/IdeationResponse";
import { type IIdeationService } from "@/modules/ideation/domain/services/IIdeationService";
import { TYPES } from "@/di/types";
import type { AsyncActionResponse } from "@/utils/handleAsync";
import { getAccessToken } from "@/utils/getCookie";
import { CacheTag } from "@/utils/cacheTag";

export class AddIdeationUseCase {
  constructor(
    @inject(TYPES.IIdeationService)
    private readonly ideationService: IIdeationService,
  ) {}

  /**
   * Executes the use case to add an ideation.
   *
   * @param {AddIdeationProps} props - The properties required to add an ideation.
   * @returns {Promise<AsyncActionResponse<AddIdeationResponse>>} - The response from the addIdeation method.
   */
  async execute(
    props: AddIdeationProps,
  ): Promise<AsyncActionResponse<AddIdeationResponse>> {
    const token = getAccessToken();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      throw new Error("Base URL is not defined");
    }

    const [res, error] = await this.ideationService.addIdeation({
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
