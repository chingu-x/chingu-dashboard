import { type Ideation } from "@/modules/ideation/application/entities/ideation";

export type IdeationBodyDto = Pick<
  Ideation,
  "title" | "description" | "vision"
>;

export interface IdeationRequestDto {
  teamId: number;
  ideationId: number;
}
