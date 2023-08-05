import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

interface Counterstate {
  value: number;
}

const initialState: Counterstate = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter;

export default counterSlice.reducer;
