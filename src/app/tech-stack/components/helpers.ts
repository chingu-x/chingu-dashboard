import { PostTechBody } from "./types/types";

export const getPostBody = (
  votedBy: string,
  techName: string,
  techCategoryId: number,
): PostTechBody => ({ votedBy, techName, techCategoryId });

export const checkIfDuplicated = (techNames: string[], suggestion: string) =>
  techNames.some(
    (techName) => techName.toLowerCase() === suggestion.toLowerCase(),
  );
