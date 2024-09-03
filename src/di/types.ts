export const TYPES = {
  /* Repositories */
  RestApiRepository: Symbol.for("RestApiRepository"),

  /* Services */
  IIdeationService: Symbol.for("IIdeationService"),

  /* UseCases */
  AddIdeationUseCase: Symbol.for("AddIdeationUseCase"),
  AddIdeationVoteUseCase: Symbol.for("AddIdeationVoteUseCase"),
  DeleteIdeationUseCase: Symbol.for("DeleteIdeationUseCase"),
  EditIdeationUseCase: Symbol.for("EditIdeationUseCase"),
  FinalizeIdeationUseCase: Symbol.for("FinalizeIdeationUseCase"),
  RemoveIdeationVoteUseCase: Symbol.for("RemoveIdeationVoteUseCase"),
};
