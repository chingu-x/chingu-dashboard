"use client";

import {
  ResourceData,
  fetchResources,
} from "@/store/features/resources/resourcesSlice";
import { useAppDispatch } from "@/store/hooks";

//create type in slice and import above to use below.
export interface ResourceProviderProps {
  payload: ResourceData[];
}

export default function ResourcesProvider({ payload }: ResourceProviderProps) {
  const dispatch = useAppDispatch();

  dispatch(fetchResources(payload));
  //dispatch(setResourcesLoadingFalse());

  return null;
}
