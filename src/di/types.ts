export const TYPES = {
  /* Ports */
  RestApiPort: Symbol.for("RestApiPort"),
  AuthClientPort: Symbol.for("AuthClientPort"),
  AuthApiPort: Symbol.for("AuthApiPort"),
  UserApiPort: Symbol.for("UserApiPort"),

  /* Adapters */
  AxiosAdapter: Symbol.for("AxiosAdapter"),
  AuthClientAdapter: Symbol.for("AuthClientAdapter"),
  AuthApiAdapter: Symbol.for("AuthApiAdapter"),

  /* UseCases */
  LoginUsecase: Symbol.for("LoginUsecase"),
  LogoutUsecase: Symbol.for("LogoutUsecase"),
  GetUserUsecase: Symbol.for("GetUserUsecase"),
};
