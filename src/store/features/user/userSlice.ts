import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { clientSignOut } from "@/store/features/auth/authSlice";
import { type User } from "@/modules/user/application/types";

const initialState: User = {
  id: "",
  firstName: "",
  lastName: "",
  countryCode: "",
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
  },
});

export const { getUserState } = userSlice.actions;

export default userSlice.reducer;
