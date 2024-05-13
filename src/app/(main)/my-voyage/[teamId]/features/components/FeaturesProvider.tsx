"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  fetchFeatures,
  type FeaturesList,
} from "@/store/features/features/featuresSlice";

export interface FeaturesProviderProps {
  payload: FeaturesList[];
}

export default function FeaturesProvider({ payload }: FeaturesProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFeatures(payload));
  }, [dispatch, payload]);

  return null;
}
