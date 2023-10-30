import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TechStackState {
  currentStackId: number | null;
}

const initialState: TechStackState = {
  currentStackId: null,
};

const techStackSlice = createSlice({
  name: "techStack",
  initialState,
  reducers: {
    setCurrentStackId: (state, action: PayloadAction<number>) => {
      state.currentStackId = action.payload;
    },
  },
});

export const { setCurrentStackId } = techStackSlice.actions;

export default techStackSlice.reducer;
