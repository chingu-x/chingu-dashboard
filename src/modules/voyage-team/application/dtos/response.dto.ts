export interface GetCurrentVoyageTeamResponseDto extends VoyageTeamMember {}
export type GetCurrentVoyageTeamIdResponseDto = string | undefined;
export type HasVoyageStartedResponseDto = boolean;

export interface VoyageTeamMember {
  id: number;
  voyageTeamId: number;
  voyageTeam: VoyageTeam;
  voyageRole: VoyageRole;
}

export interface VoyageStatus {
  name: string;
}

interface Voyage {
  status: VoyageStatus;
}

interface VoyageTeam {
  name: string;
  voyage: Voyage;
  projectSubmitted: boolean;
}

export interface VoyageRole {
  name: string;
}
