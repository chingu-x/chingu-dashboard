import { type User } from "@/modules/user/application/types";

export interface GetUserResponseDto extends User {}

export type GetChinguMemberStatusResponseDto = boolean;

// TODO: move this to separate module
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
