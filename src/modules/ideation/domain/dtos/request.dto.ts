import { type IdeationRequestDto, type IdeationBodyDto } from "./common.dto";

export interface AddIdeationBodyDto extends IdeationBodyDto {}

export interface EditIdeationBodyDto extends Partial<AddIdeationBodyDto> {}

export interface AddIdeationRequestDto
  extends Pick<IdeationRequestDto, "teamId">,
    IdeationBodyDto {
  cache?: RequestCache;
  token?: string;
}

export type EditIdeationRequestDto = EditIdeationBodyDto &
  Omit<IdeationRequestDto, "teamId"> & {
    cache?: RequestCache;
    token?: string;
  };

export type DeleteIdeationRequestDto = Omit<IdeationRequestDto, "teamId"> & {
  cache?: RequestCache;
  token?: string;
};

export type IdeationVoteRequestDto = Omit<IdeationRequestDto, "teamId"> & {
  cache?: RequestCache;
  token?: string;
};
export type FetchIdeationsRequestDto = Pick<IdeationRequestDto, "teamId">;

export interface FinalizeIdeationRequestDto extends IdeationRequestDto {
  cache?: RequestCache;
  token?: string;
}
