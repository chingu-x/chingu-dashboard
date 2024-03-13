"use client";

import {
  ResourceData,
  fetchResources,
} from "@/store/features/resources/resourcesSlice";
import { useAppDispatch } from "@/store/hooks";

export interface ResourceProviderProps {
  payload: ResourceData[];
}

export default function ResourcesProvider({ payload }: ResourceProviderProps) {
  const dispatch = useAppDispatch();

  dispatch(fetchResources(payload));

  return null;
}
