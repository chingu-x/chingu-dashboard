export const TYPES = {
  /* Ports */
  RestApiPort: Symbol.for("RestApiPort"),
  AuthApiPort: Symbol.for("AuthApiPort"),
  UserApiPort: Symbol.for("UserApiPort"),

  /* Adapters */
  AuthClientAdapter: Symbol.for("AuthClientAdapter"),
  UserClientAdapter: Symbol.for("UserClientAdapter"),

  /* UseCases */
  LoginUsecase: Symbol.for("LoginUsecase"),
  LogoutUsecase: Symbol.for("LogoutUsecase"),
  GetUserUsecase: Symbol.for("GetUserUsecase"),
};
