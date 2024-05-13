import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type VoyageMember } from "@/store/features/ideation/ideationSlice";

interface Category {
  id: number;
  name: string;
}

interface FeaturesState {
  loading: boolean;
  featuresList: FeaturesList[];
}

export interface FeaturesList {
  categoryId: number;
  categoryName: string;
  features: Features[];
}

export interface Features {
  id: number;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  teamMemberId: number;
  category: Category;
  addedBy: {
    member: VoyageMember;
  };
}

const initialState: FeaturesState = {
  loading: false,
  featuresList: [],
};

export const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    fetchFeatures: (state, action: PayloadAction<FeaturesList[]>) => {
      state.loading = true;
      state.featuresList = action.payload;
    },
    setFeaturesLoadingTrue: (state) => {
      state.loading = true;
    },
    setFeaturesLoadingFalse: (state) => {
      state.loading = false;
    },
  },
});

export const {
  fetchFeatures,
  setFeaturesLoadingTrue,
  setFeaturesLoadingFalse,
} = featuresSlice.actions;

export default featuresSlice.reducer;
