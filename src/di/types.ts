export const TYPES = {
  /* Ports */
  RestApiPort: Symbol.for("RestApiPort"),
  IdeationApiPort: Symbol.for("IdeationApiPort"),

  /* Adapters */
  // NextJsRestApiAdapter: Symbol.for("NextJsRestApiAdapter"),
  IdeationApiAdapter: Symbol.for("IdeationApiAdapter"),

  /* UseCases */
  AddIdeationUseCase: Symbol.for("AddIdeationUseCase"),
  AddIdeationVoteUseCase: Symbol.for("AddIdeationVoteUseCase"),
  DeleteIdeationUseCase: Symbol.for("DeleteIdeationUseCase"),
  EditIdeationUseCase: Symbol.for("EditIdeationUseCase"),
  FinalizeIdeationUseCase: Symbol.for("FinalizeIdeationUseCase"),
  RemoveIdeationVoteUseCase: Symbol.for("RemoveIdeationVoteUseCase"),
};
