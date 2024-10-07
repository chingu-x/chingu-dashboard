import { inject, injectable } from "tsyringe";
import { IdeationUrls } from "@/modules/ideation/domain/IdeationUrls";
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
import type { AsyncActionResponse } from "@/utils/handleAsync";
import { handleAsync } from "@/utils/handleAsync";
import { TYPES } from "@/di/types";
import { type IApiClientRepository } from "@/modules/network/domain/repositories/IApiClientRepository";

/**
 * Service class for handling ideation-related operations.
 */
@injectable()
export class IdeationService implements IIdeationService {
  constructor(
    @inject(TYPES.IApiClientRepository)
    private readonly apiClient: IApiClientRepository,
  ) {}

  /**
   * Adds a new ideation.
   *
   * @param {AddIdeationProps} props - The properties required to add an ideation.
   * @returns {Promise<AsyncActionResponse<AddIdeationResponse>>} - The response from the addIdeation method.
   */
  async addIdeation({
    teamId,
    title,
    description,
    vision,
    baseUrl,
    token,
  }: AddIdeationProps): Promise<AsyncActionResponse<AddIdeationResponse>> {
    const addIdeationAsync = () =>
      this.apiClient.POST<AddIdeationBody, AddIdeationResponse>({
        baseUrl,
        url: `${IdeationUrls.BASE_URL_TEAMS}/${teamId}/${IdeationUrls.SUB_URLS.IDEATIONS}`,
        token,
        cache: "default",
        payload: { title, description, vision },
      });

    return await handleAsync(addIdeationAsync);
  }

  /**
   * Edits an existing ideation.
   *
   * @param {EditIdeationProps} props - The properties required to edit an ideation.
   * @returns {Promise<AsyncActionResponse<EditIdeationResponse>>} - The response from the editIdeation method.
   */
  async editIdeation({
    ideationId,
    title,
    description,
    vision,
    baseUrl,
    token,
  }: EditIdeationProps): Promise<AsyncActionResponse<EditIdeationResponse>> {
    const editIdeationAsync = () =>
      this.apiClient.PATCH<EditIdeationBody, EditIdeationResponse>({
        baseUrl,
        url: `${IdeationUrls.BASE_URL_IDEATIONS}/${ideationId}`,
        token,
        cache: "default",
        payload: { title, description, vision },
      });

    return await handleAsync(editIdeationAsync);
  }

  /**
   * Deletes an existing ideation.
   *
   * @param {DeleteIdeationProps} props - The properties required to delete an ideation.
   * @returns {Promise<AsyncActionResponse<DeleteIdeationResponse>>} - The response from the deleteIdeation method.
   */
  async deleteIdeation({
    ideationId,
    baseUrl,
    token,
  }: DeleteIdeationProps): Promise<
    AsyncActionResponse<DeleteIdeationResponse>
  > {
    const deleteIdeationAsync = () =>
      this.apiClient.DELETE<DeleteIdeationResponse>({
        baseUrl,
        url: `${IdeationUrls.BASE_URL_IDEATIONS}/${ideationId}`,
        token,
        cache: "default",
      });

    return await handleAsync(deleteIdeationAsync);
  }

  /**
   * Adds a vote to an ideation.
   *
   * @param {IdeationVoteProps} props - The properties required to add a vote to an ideation.
   * @returns {Promise<AsyncActionResponse<IdeationVoteResponse>>} - The response from the addIdeationVote method.
   */
  async addIdeationVote({
    ideationId,
    baseUrl,
    token,
  }: IdeationVoteProps): Promise<AsyncActionResponse<IdeationVoteResponse>> {
    const addIdeationVoteAsync = () =>
      this.apiClient.POST<undefined, IdeationVoteResponse>({
        baseUrl,
        url: `${IdeationUrls.BASE_URL_IDEATIONS}/${ideationId}/${IdeationUrls.SUB_URLS.IDEATION_VOTES}`,
        token,
        cache: "default",
      });

    return await handleAsync(addIdeationVoteAsync);
  }

  /**
   * Removes a vote from an ideation.
   *
   * @param {IdeationVoteProps} props - The properties required to remove a vote from an ideation.
   * @returns {Promise<AsyncActionResponse<IdeationVoteResponse>>} - The response from the removeIdeationVote method.
   */
  async removeIdeationVote({
    ideationId,
    baseUrl,
    token,
  }: IdeationVoteProps): Promise<AsyncActionResponse<IdeationVoteResponse>> {
    const removeIdeationVoteAsync = () =>
      this.apiClient.DELETE<IdeationVoteResponse>({
        baseUrl,
        url: `${IdeationUrls.BASE_URL_IDEATIONS}/${ideationId}/${IdeationUrls.SUB_URLS.IDEATION_VOTES}`,
        token,
        cache: "default",
      });

    return await handleAsync(removeIdeationVoteAsync);
  }

  /**
   * Finalizes an ideation.
   *
   * @param {FinalizeIdeationProps} props - The properties required to finalize an ideation.
   * @returns {Promise<AsyncActionResponse<FinalizeIdeationResponse>>} - The response from the finalizeIdeation method.
   */
  async finalizeIdeation({
    teamId,
    ideationId,
    baseUrl,
    token,
  }: FinalizeIdeationProps): Promise<
    AsyncActionResponse<FinalizeIdeationResponse>
  > {
    const finalizeIdeationAsync = () =>
      this.apiClient.POST<undefined, FinalizeIdeationResponse>({
        baseUrl,
        url: `${IdeationUrls.BASE_URL_TEAMS}/${teamId}/${IdeationUrls.SUB_URLS.IDEATIONS}/${ideationId}/${IdeationUrls.SUB_URLS.SELECT}`,
        token,
        cache: "default",
      });

    return await handleAsync(finalizeIdeationAsync);
  }
}
