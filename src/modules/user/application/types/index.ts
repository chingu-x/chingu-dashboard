import { type VoyageTeamMember } from "@/modules/voyage-team/application/dtos/response.dto";

export interface User {
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
  currentDateInUserTimezone: Date | null;
}

type providerType = "discord";
