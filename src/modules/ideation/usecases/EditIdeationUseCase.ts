"use server";

import { inject } from "tsyringe";
import { revalidateTag } from "next/cache";
import type { EditIdeationProps } from "@/modules/ideation/domain/IdeationProps";
import type { EditIdeationResponse } from "@/modules/ideation/domain/IdeationResponse";
import { type IIdeationService } from "@/modules/ideation/domain/services/IIdeationService";
import { TYPES } from "@/di/types";
import type { AsyncActionResponse } from "@/utils/handleAsync";
import { getAccessToken } from "@/utils/getCookie";
import { CacheTag } from "@/utils/cacheTag";

export class EditIdeationUseCase {
  constructor(
    @inject(TYPES.IIdeationService)
    private readonly ideationService: IIdeationService,
  ) {}

  /**
   * Executes the use case to edit an ideation.
   *
   * @param {EditIdeationProps} props - The properties required to edit an ideation.
   * @returns {Promise<AsyncActionResponse<EditIdeationResponse>>} - The response from the editIdeation method.
   */
  async execute(
    props: EditIdeationProps,
  ): Promise<AsyncActionResponse<EditIdeationResponse>> {
    const token = getAccessToken();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      throw new Error("Base URL is not defined");
    }

    const [res, error] = await this.ideationService.editIdeation({
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
