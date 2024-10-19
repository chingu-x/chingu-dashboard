import { type VoyageTeam } from "@/store/features/directory/directorySlice";

export const teamMemberData: VoyageTeam = {
  id: 20,
  member: {
    firstName: "Jessica",
    lastName: "Williamson",
    avatar:
      "https://gravatar.com/avatar/a6416cf1e8d0208251a732a6af75530878cdfd92b85d2de9ba6c4fec92d8a157?s=200&r=g&d=robohash\n",
    oAuthProfiles: [
      {
        provider: {
          name: "discord",
        },
        providerUsername: "jessica-discord",
      },
    ],
    countryCode: "AU",
    timezone: "Australia/Melbourne",
    currentTime: "02:56 (GMT+10)",
  },
  hrPerSprint: 10,
  voyageRole: {
    name: "Developer",
  },
};
