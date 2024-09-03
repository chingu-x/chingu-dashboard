import { inject, injectable } from "tsyringe";
import { IdeationUrls } from "@/modules/ideation/constants/IdeationUrls";
import { TYPES } from "@/di/types";
import { type IdeationApiRepository } from "@/modules/ideation/domain/ports/ideationApiRepository";
import { type RestApiRepository } from "@/modules/rest-api/domain/ports/restApiRepository";
import type {
  AddIdeationBodyDto,
  AddIdeationRequestDto,
  DeleteIdeationRequestDto,
  EditIdeationBodyDto,
  EditIdeationRequestDto,
  FinalizeIdeationRequestDto,
  IdeationVoteRequestDto,
} from "@/modules/ideation/domain/dtos/request.dto";
import type {
  EditIdeationResponseDto,
  AddIdeationResponseDto,
  DeleteIdeationResponseDto,
  IdeationVoteResponseDto,
  FinalizeIdeationResponseDto,
} from "@/modules/ideation/domain/dtos/response.dto";

/**
 * Repository (adapter) implementing the port
 */
@injectable()
export class IdeationApiRepositoryImpl implements IdeationApiRepository {
  constructor(
    @inject(TYPES.RestApiRepository)
    private readonly apiClient: RestApiRepository,
  ) {}

  async addIdeation({
    teamId,
    title,
    description,
    vision,
    cache,
    token,
  }: AddIdeationRequestDto): Promise<AddIdeationResponseDto> {
    return await this.apiClient.post<
      AddIdeationBodyDto,
      AddIdeationResponseDto
    >({
      url: `${IdeationUrls.BASE_URL_TEAMS}/${teamId}/${IdeationUrls.SUB_URLS.IDEATIONS}`,
      options: {
        cache,
        token,
      },
      payload: { title, description, vision },
    });
  }

  async editIdeation({
    ideationId,
    title,
    description,
    vision,
    cache,
    token,
  }: EditIdeationRequestDto): Promise<EditIdeationResponseDto> {
    return await this.apiClient.patch<
      EditIdeationBodyDto,
      EditIdeationResponseDto
    >({
      url: `${IdeationUrls.BASE_URL_IDEATIONS}/${ideationId}`,
      options: {
        cache,
        token,
      },
      payload: { title, description, vision },
    });
  }

  async deleteIdeation({
    ideationId,
    cache,
    token,
  }: DeleteIdeationRequestDto): Promise<DeleteIdeationResponseDto> {
    return await this.apiClient.delete<DeleteIdeationResponseDto>({
      url: `${IdeationUrls.BASE_URL_IDEATIONS}/${ideationId}`,
      options: {
        cache,
        token,
      },
    });
  }

  async addIdeationVote({
    ideationId,
    cache,
    token,
  }: IdeationVoteRequestDto): Promise<IdeationVoteResponseDto> {
    return await this.apiClient.post<undefined, IdeationVoteResponseDto>({
      url: `${IdeationUrls.BASE_URL_IDEATIONS}/${ideationId}/${IdeationUrls.SUB_URLS.IDEATION_VOTES}`,
      options: {
        cache,
        token,
      },
    });
  }

  async removeIdeationVote({
    ideationId,
    cache,
    token,
  }: IdeationVoteRequestDto): Promise<IdeationVoteResponseDto> {
    return await this.apiClient.delete<IdeationVoteResponseDto>({
      url: `${IdeationUrls.BASE_URL_IDEATIONS}/${ideationId}/${IdeationUrls.SUB_URLS.IDEATION_VOTES}`,
      options: {
        cache,
        token,
      },
    });
  }

  async finalizeIdeation({
    teamId,
    ideationId,
    cache,
    token,
  }: FinalizeIdeationRequestDto): Promise<FinalizeIdeationResponseDto> {
    return await this.apiClient.post<undefined, FinalizeIdeationResponseDto>({
      url: `${IdeationUrls.BASE_URL_TEAMS}/${teamId}/${IdeationUrls.SUB_URLS.IDEATIONS}/${ideationId}/${IdeationUrls.SUB_URLS.SELECT}`,
      options: {
        cache,
        token,
      },
    });
  }
}
