import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { PURGE } from "redux-persist";
import { clientSignOut } from "@/store/features/auth/authSlice";

export interface ResourceData {
  id: number;
  teamMemberId: number;
  url: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  addedBy: { member: [object] };
}
interface ResourcesState {
  //loading:
  resources: ResourceData[];
}
const initialState: ResourcesState = {
  //loading:false
  resources: [],
};

export const resourcesSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    fetchResources: (state, action: PayloadAction<ResourceData[]>) => {
      state.resources = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(PURGE, () => {
      void storage.removeItem("persit:root");
    });
    builder.addCase(clientSignOut, () => initialState);
  },
});

export const { fetchResources } = resourcesSlice.actions;

export default resourcesSlice.reducer;
