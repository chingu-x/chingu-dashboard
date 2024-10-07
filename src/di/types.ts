export const TYPES = {
  /* Repositories */
  IApiClientRepository: Symbol.for("IApiClientRepository"),

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
