import { container } from "tsyringe";
import { TYPES } from "./types";
import type { AddIdeationUseCase } from "@/modules/ideation/application/usecases/addIdeationUseCase";
import type { AddIdeationVoteUseCase } from "@/modules/ideation/application/usecases/addIdeationVoteUseCase";
import type { DeleteIdeationUseCase } from "@/modules/ideation/application/usecases/deleteIdeationUseCase";
import type { EditIdeationUseCase } from "@/modules/ideation/application/usecases/editIdeationUseCase";
import type { FinalizeIdeationUseCase } from "@/modules/ideation/application/usecases/finalizeIdeationUseCase";
import type { RemoveIdeationVoteUseCase } from "@/modules/ideation/application/usecases/removeIdeationVoteUseCase";

export const injectables = {
  /* Ideation */
  addIdeationUseCase: container.resolve<AddIdeationUseCase>(
    TYPES.AddIdeationUseCase,
  ),
  addIdeationVoteUseCase: container.resolve<AddIdeationVoteUseCase>(
    TYPES.AddIdeationVoteUseCase,
  ),
  deleteIdeationUseCase: container.resolve<DeleteIdeationUseCase>(
    TYPES.DeleteIdeationUseCase,
  ),
  editIdeationUseCase: container.resolve<EditIdeationUseCase>(
    TYPES.EditIdeationUseCase,
  ),
  finalizeIdeationUseCase: container.resolve<FinalizeIdeationUseCase>(
    TYPES.FinalizeIdeationUseCase,
  ),
  removeIdeationVoteUseCase: container.resolve<RemoveIdeationVoteUseCase>(
    TYPES.RemoveIdeationVoteUseCase,
  ),
} as const;
