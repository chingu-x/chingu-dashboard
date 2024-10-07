import type { IdeationProps } from "./IdeationProps";

export type IdeationWithoutTeamId = Omit<IdeationProps, "teamId">;
