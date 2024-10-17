export const TYPES = {
  /* Ports */
  RestApiPort: Symbol.for("RestApiPort"),
  AuthApiPort: Symbol.for("AuthApiPort"),
  IdeationApiPort: Symbol.for("IdeationApiPort"),
  IdeationClientPort: Symbol.for("IdeationClientPort"),

  /* Adapters */
  // NextJsRestApiAdapter: Symbol.for("NextJsRestApiAdapter"),
  AuthApiAdapter: Symbol.for("AuthApiAdapter"),
  IdeationApiAdapter: Symbol.for("IdeationApiAdapter"),

  /* UseCases */
  LoginUsecase: Symbol.for("LoginUsecase"),
  AddIdeationUseCase: Symbol.for("AddIdeationUseCase"),
  AddIdeationVoteUseCase: Symbol.for("AddIdeationVoteUseCase"),
  DeleteIdeationUseCase: Symbol.for("DeleteIdeationUseCase"),
  EditIdeationUseCase: Symbol.for("EditIdeationUseCase"),
  FinalizeIdeationUseCase: Symbol.for("FinalizeIdeationUseCase"),
  RemoveIdeationVoteUseCase: Symbol.for("RemoveIdeationVoteUseCase"),
};
