import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { VoyageMember } from "@/store/features/ideation/ideationSlice";

export interface TechStackData {
  id: number;
  name: string;
  description: string;
  isSelected: boolean;
  teamTechStackItems: TechStackItem[];
}
export interface TechStackItem {
  id: number;
  name: string;
  teamTechStackItemVotes: TechStackItemVotes[];
}
interface TechStackItemVotes {
  votedBy: {
    member: VoyageMember;
  };
}
interface TechStackState {
  techStack: TechStackData[];
}
const initialState: TechStackState = {
  techStack: [],
};

export const techStackSlice = createSlice({
  name: "tech-stack",
  initialState,
  reducers: {
    fetchTechStack: (state, action: PayloadAction<TechStackData[]>) => {
      state.techStack = action.payload;
    },
  },
});

export const { fetchTechStack } = techStackSlice.actions;
export default techStackSlice.reducer;
