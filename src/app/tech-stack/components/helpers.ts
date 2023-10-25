import { PostTechBody } from "./types/types";

export const getPostBody = (
  votedBy: string,
  techName: string,
  techCategoryId: number,
): PostTechBody => ({ votedBy, techName, techCategoryId });
