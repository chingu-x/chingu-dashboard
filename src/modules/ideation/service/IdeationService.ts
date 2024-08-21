import { inject, injectable } from "tsyringe";
import { revalidateTag } from "next/cache";
import type {
  AddIdeationBody,
  EditIdeationBody,
} from "@/modules/ideation/domain/IdeationBody";
import type {
  AddIdeationResponse,
  DeleteIdeationResponse,
  EditIdeationResponse,
  FinalizeIdeationResponse,
  IdeationVoteResponse,
} from "@/modules/ideation/domain/IdeationResponse";
import type { IIdeationService } from "@/modules/ideation/domain/services/IIdeationService";
import type {
  AddIdeationProps,
  EditIdeationProps,
  DeleteIdeationProps,
  IdeationVoteProps,
  FinalizeIdeationProps,
} from "@/modules/ideation/domain/IdeationProps";
import { ApiClientRepository } from "@/modules/network/repositories/ApiClientRepository";
import { getAccessToken } from "@/utils/getCookie";
import type { AsyncActionResponse } from "@/utils/handleAsync";
import { handleAsync } from "@/utils/handleAsync";
import { CacheTag } from "@/utils/cacheTag";
import { TYPES } from "@/di/types";

@injectable()
export class IdeationService implements IIdeationService {
  constructor(
    @inject(TYPES.ApiClientRepository)
    private readonly apiClient: ApiClientRepository,
  ) {}

  async addIdeation({
    teamId,
    title,
    description,
    vision,
    baseUrl,
  }: AddIdeationProps): Promise<AsyncActionResponse<AddIdeationResponse>> {
    const token = getAccessToken();

    const addIdeationAsync = () =>
      this.apiClient.POST<AddIdeationBody, AddIdeationResponse>({
        baseUrl,
        url: `api/v1/voyages/teams/${teamId}/ideations`,
        token,
        cache: "default",
        payload: { title, description, vision },
      });

    const [res, error] = await handleAsync(addIdeationAsync);

    if (res) {
      revalidateTag(CacheTag.ideation);
    }

    return [res, error];
  }

  async editIdeation({
    ideationId,
    title,
    description,
    vision,
    baseUrl,
  }: EditIdeationProps): Promise<AsyncActionResponse<EditIdeationResponse>> {
    const token = getAccessToken();

    const editIdeationAsync = () =>
      this.apiClient.PATCH<EditIdeationBody, EditIdeationResponse>({
        baseUrl,
        url: `api/v1/voyages/ideations/${ideationId}`,
        token,
        cache: "default",
        payload: { title, description, vision },
      });

    const [res, error] = await handleAsync(editIdeationAsync);

    if (res) {
      revalidateTag(CacheTag.ideation);
    }

    return [res, error];
  }

  async deleteIdeation({
    ideationId,
    baseUrl,
  }: DeleteIdeationProps): Promise<
    AsyncActionResponse<DeleteIdeationResponse>
  > {
    const token = getAccessToken();

    const deleteIdeationAsync = () =>
      this.apiClient.DELETE<DeleteIdeationResponse>({
        baseUrl,
        url: `api/v1/voyages/ideations/${ideationId}`,
        token,
        cache: "default",
      });

    const [res, error] = await handleAsync(deleteIdeationAsync);

    if (res) {
      revalidateTag(CacheTag.ideation);
    }

    return [res, error];
  }

  async addIdeationVote({
    ideationId,
    baseUrl,
  }: IdeationVoteProps): Promise<AsyncActionResponse<IdeationVoteResponse>> {
    const token = getAccessToken();

    const addIdeationVoteAsync = () =>
      this.apiClient.POST<undefined, IdeationVoteResponse>({
        baseUrl,
        url: `api/v1/voyages/ideations/${ideationId}/ideation-votes`,
        token,
        cache: "default",
      });

    const [res, error] = await handleAsync(addIdeationVoteAsync);

    if (res) {
      revalidateTag(CacheTag.ideation);
    }

    return [res, error];
  }

  async removeIdeationVote({
    ideationId,
    baseUrl,
  }: IdeationVoteProps): Promise<AsyncActionResponse<IdeationVoteResponse>> {
    const token = getAccessToken();

    const removeIdeationVoteAsync = () =>
      this.apiClient.DELETE<IdeationVoteResponse>({
        baseUrl,
        url: `api/v1/voyages/ideations/${ideationId}/ideation-votes`,
        token,
        cache: "default",
      });

    const [res, error] = await handleAsync(removeIdeationVoteAsync);

    if (res) {
      revalidateTag(CacheTag.ideation);
    }

    return [res, error];
  }

  async finalizeIdeation({
    teamId,
    ideationId,
    baseUrl,
  }: FinalizeIdeationProps): Promise<
    AsyncActionResponse<FinalizeIdeationResponse>
  > {
    const token = getAccessToken();

    const finalizeIdeationAsync = () =>
      this.apiClient.POST<undefined, FinalizeIdeationResponse>({
        baseUrl,
        url: `api/v1/voyages/teams/${teamId}/ideations/${ideationId}/select`,
        token,
        cache: "default",
      });

    const [res, error] = await handleAsync(finalizeIdeationAsync);

    if (res) {
      revalidateTag(CacheTag.ideation);
    }

    return [res, error];
  }
}
