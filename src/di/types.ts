export const TYPES = {
  /* Ports */
  RestApiPort: Symbol.for("RestApiPort"),
  AuthApiPort: Symbol.for("AuthApiPort"),
  UserApiPort: Symbol.for("UserApiPort"),
  VoyageTeamClientPort: Symbol.for("VoyageTeamClientPort"),

  /* Adapters */
  AuthClientAdapter: Symbol.for("AuthClientAdapter"),
  UserClientAdapter: Symbol.for("UserClientAdapter"),
  VoyageTeamClientAdapter: Symbol.for("VoyageTeamClientAdapter"),

  /* UseCases */
  LoginUsecase: Symbol.for("LoginUsecase"),
  LogoutUsecase: Symbol.for("LogoutUsecase"),
  GetUserUsecase: Symbol.for("GetUserUsecase"),
  GetChinguMemberStatusUsecase: Symbol.for("GetChinguMemberStatusUsecase"),
  RequestResetPasswordUsecase: Symbol.for("RequestResetPasswordUsecase"),
  ResetPasswordUsecase: Symbol.for("ResetPasswordUsecase"),
  GetCurrentVoyageTeamUsecase: Symbol.for("GetCurrentVoyageTeamUsecase"),
};
