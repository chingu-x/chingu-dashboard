import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  discordId: string;
}

const initialState: UserState = {
  id: "",
  firstName: "",
  lastName: "",
  countryCode: "",
  discordId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserState: (state, action: PayloadAction<UserState>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { getUserState } = userSlice.actions;

export default userSlice.reducer;
