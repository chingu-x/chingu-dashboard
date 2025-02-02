import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type User } from "@chingu-x/modules/user";
import { clientSignOut } from "@/store/features/auth/authSlice";
import {
  submitVoyageProject,
  SubmitVoyageProjectPayload,
  submitWeeklyCheckin,
  type SubmitWeeklyCheckinPayload,
} from "@/store/features/sprint/sprintSlice";

const initialState: User = {
  id: "",
  firstName: "",
  lastName: "",
  countryCode: "",
  roles: [],
  oAuthProfiles: [
    {
      provider: {
        name: "discord",
      },
      providerUsername: "",
    },
  ],
  email: "",
  timezone: "",
  avatar: "",
  voyageTeamMembers: [],
  sprintCheckIn: [],
  currentDateInUserTimezone: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserState: (state, action: PayloadAction<User>) => ({
      ...state,
      ...action.payload,
    }),
  },
  extraReducers(builder) {
    builder.addCase(clientSignOut, () => initialState);
    builder.addCase(
      submitWeeklyCheckin,
      (state, action: PayloadAction<SubmitWeeklyCheckinPayload>) => {
        const { sprintId } = action.payload;
        state.sprintCheckIn = [...state.sprintCheckIn, sprintId];
      },
    );
    builder.addCase(
      submitVoyageProject,
      (state, action: PayloadAction<SubmitVoyageProjectPayload>) => {
        const { teamId } = action.payload;
        const voyageTeam = state.voyageTeamMembers.find(
          (voyageTeam) => voyageTeam.voyageTeamId === teamId,
        );

        if (voyageTeam) {
          voyageTeam.voyageTeam.projectSubmitted = true;
        }
      },
    );
  },
});

export const { getUserState } = userSlice.actions;

export default userSlice.reducer;
