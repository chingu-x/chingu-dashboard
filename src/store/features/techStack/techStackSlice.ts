import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TechStackState {
  currentStackId: number | null;
  techNames: string[];
}

const initialState: TechStackState = {
  currentStackId: null,
  techNames: [],
};

const techStackSlice = createSlice({
  name: "techStack",
  initialState,
  reducers: {
    setCurrentStackId: (state, action: PayloadAction<number>) => {
      state.currentStackId = action.payload;
    },
    setTechNames: (state, action: PayloadAction<string[]>) => {
      state.techNames = action.payload;
    },
  },
});

export const { setCurrentStackId, setTechNames } = techStackSlice.actions;

export default techStackSlice.reducer;
