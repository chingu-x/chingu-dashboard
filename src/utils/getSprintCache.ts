import { CacheTag } from "./cacheTag";

export function getSprintCache(sprintNumber: number) {
  if (sprintNumber === 1) return CacheTag.sprint1;
  if (sprintNumber === 2) return CacheTag.sprint2;
  if (sprintNumber === 3) return CacheTag.sprint3;
  if (sprintNumber === 4) return CacheTag.sprint4;
  if (sprintNumber === 5) return CacheTag.sprint5;
  if (sprintNumber === 6) return CacheTag.sprint6;
}
