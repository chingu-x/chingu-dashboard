import { container } from "tsyringe";
import { TYPES } from "./types";
import type { AddIdeationUseCase } from "@/modules/ideation/usecases/AddIdeationUseCase";
import type { AddIdeationVoteUseCase } from "@/modules/ideation/usecases/AddIdeationVoteUseCase";
import type { DeleteIdeationUseCase } from "@/modules/ideation/usecases/DeleteIdeationUseCase";
import type { EditIdeationUseCase } from "@/modules/ideation/usecases/EditIdeationUseCase";
import type { FinalizeIdeationUseCase } from "@/modules/ideation/usecases/FinalizeIdeationUseCase";
import type { RemoveIdeationVoteUseCase } from "@/modules/ideation/usecases/RemoveIdeationVoteUseCase";

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
