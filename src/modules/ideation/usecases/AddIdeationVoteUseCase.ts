"use server";

import { inject } from "tsyringe";
import { revalidateTag } from "next/cache";
import type { IdeationVoteProps } from "@/modules/ideation/domain/IdeationProps";
import type { IdeationVoteResponse } from "@/modules/ideation/domain/IdeationResponse";
import { type IIdeationService } from "@/modules/ideation/domain/services/IIdeationService";
import { TYPES } from "@/di/types";
import type { AsyncActionResponse } from "@/utils/handleAsync";
import { getAccessToken } from "@/utils/getCookie";
import { CacheTag } from "@/utils/cacheTag";

export class AddIdeationVoteUseCase {
  constructor(
    @inject(TYPES.IIdeationService)
    private readonly ideationService: IIdeationService,
  ) {}

  /**
   * Executes the use case to add an ideation vote.
   *
   * @param {IdeationVoteProps} props - The properties required to add an ideation vote.
   * @returns {Promise<AsyncActionResponse<IdeationVoteResponse>>} - The response from the addIdeationVote method.
   */
  async execute(
    props: IdeationVoteProps,
  ): Promise<AsyncActionResponse<IdeationVoteResponse>> {
    const token = getAccessToken();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      throw new Error("Base URL is not defined");
    }

    const [res, error] = await this.ideationService.addIdeationVote({
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
