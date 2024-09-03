import { type Ideation } from "@/modules/ideation/domain/entities/Ideation";

export type IdeationBodyDto = Pick<
  Ideation,
  "title" | "description" | "vision"
>;

// IdeationProps
export interface IdeationRequestDto {
  teamId: number;
  ideationId: number;
}
