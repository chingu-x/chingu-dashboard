"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  fetchFeatures,
  FeaturesList,
  setFeaturesLoadingFalse,
} from "@/store/features/features/featuresSlice";

export interface FeaturesProviderProps {
  payload: FeaturesList[];
}

export default function FeaturesProvider({ payload }: FeaturesProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFeatures(payload));
    dispatch(setFeaturesLoadingFalse());
  }, [dispatch, payload]);

  return null;
}
