import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type VoyageMember } from "@/store/features/ideation/ideationSlice";

export interface ResourceData {
  id: number;
  teamMemberId: number;
  url: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  addedBy: {
    member: Pick<VoyageMember, "avatar" | "firstName" | "lastName" | "id">;
  };
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
});

export const { fetchResources } = resourcesSlice.actions;

export default resourcesSlice.reducer;
