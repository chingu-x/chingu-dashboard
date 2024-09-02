import type { AddIdeationType } from "./AddIdeationType";
import type { EditIdeationBody, IdeationBody } from "./IdeationBody";
import type { IdeationWithoutTeamId } from "./IdeationWithoutTeamId";

export interface IdeationProps {
  teamId: number;
  ideationId: number;
}

export interface AddIdeationProps extends AddIdeationType, IdeationBody {
  baseUrl: string;
  token: string;
}

export type EditIdeationProps = EditIdeationBody &
  IdeationWithoutTeamId & { baseUrl: string; token: string };

export type DeleteIdeationProps = IdeationWithoutTeamId & {
  baseUrl: string;
  token: string;
};

export type IdeationVoteProps = IdeationWithoutTeamId & {
  baseUrl: string;
  token: string;
};

export type FetchIdeationsProps = Pick<IdeationProps, "teamId">;

export interface FinalizeIdeationProps extends IdeationProps {
  baseUrl: string;
  token: string;
}
