import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { User } from "@chingu-x/modules/user";
import type { MyTeam } from "@chingu-x/modules/my-team";

const initialState: MyTeam = {
  id: 0,
  voyageId: 0,
  name: "",
  status: {
    name: "",
  },
  repoUrl: "",
  repoUrlBE: "",
  deployedUrl: "",
  deployedUrlBE: "",
  tier: {
    id: 0,
    name: "",
  },
  endDate: "",
  voyageTeamMembers: [
    {
      id: 0,
      member: {
        firstName: "",
        lastName: "",
        avatar: "",
        oAuthProfiles: [
          {
            provider: {
              name: "discord",
            },
            providerUsername: "",
          },
        ],
        countryCode: "",
        timezone: "",
        currentTime: "",
      },
      hrPerSprint: 0,
      voyageRole: {
        name: "",
      },
    },
  ],
};

interface EditHoursPayload {
  user: User;
  hrPerSprint: number;
}

export const myTeamSlice = createSlice({
  name: "my-team",
  initialState,
  reducers: {
    fetchTeamDirectory: (state, action: PayloadAction<MyTeam>) => ({
      ...state,
      ...action.payload,
    }),
    editHours: (state, action: PayloadAction<EditHoursPayload>) => {
      const userIdSet = new Set(
        action.payload.user.voyageTeamMembers.map((member) => member.id),
      );

      const currentUser = state.voyageTeamMembers.find((member) =>
        userIdSet.has(member.id),
      );

      currentUser!.hrPerSprint = action.payload.hrPerSprint;
    },
  },
});

export const { fetchTeamDirectory, editHours } = myTeamSlice.actions;

export default myTeamSlice.reducer;
