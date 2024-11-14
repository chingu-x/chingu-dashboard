export interface GetUserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  oAuthProfiles: {
    provider: {
      name: providerType;
    };
    providerUsername: string;
  }[];
  email: string;
  timezone: string;
  avatar: string;
  voyageTeamMembers: VoyageTeamMember[];
  sprintCheckIn: number[];
  currentDate: Date | null;
}

type providerType = "discord";

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
