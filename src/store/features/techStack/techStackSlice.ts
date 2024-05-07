import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface TechStackData {
  id: number;
  name: string;
  description: string;
  teamTechStackItems: TechStackItem[];
}
export interface TechStackItem {
  id: number;
  name: string;
  teamTechStackItemVotes: TechStackItemVotes[];
}
interface TechStackItemVotes {
  votedBy: {
    member: {
      id: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };
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
