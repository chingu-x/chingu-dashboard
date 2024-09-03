import { container } from "tsyringe";
import { TYPES } from "./types";
import type { AddIdeationUseCase } from "@/modules/ideation/application/usecases/AddIdeationUseCase";
import type { AddIdeationVoteUseCase } from "@/modules/ideation/application/usecases/AddIdeationVoteUseCase";
import type { DeleteIdeationUseCase } from "@/modules/ideation/application/usecases/DeleteIdeationUseCase";
import type { EditIdeationUseCase } from "@/modules/ideation/application/usecases/EditIdeationUseCase";
import type { FinalizeIdeationUseCase } from "@/modules/ideation/application/usecases/FinalizeIdeationUseCase";
import type { RemoveIdeationVoteUseCase } from "@/modules/ideation/application/usecases/RemoveIdeationVoteUseCase";

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
