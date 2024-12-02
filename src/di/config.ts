import { container } from "tsyringe";
import { TYPES } from "./types";
import { AuthApiAdapter } from "@/modules/auth/adapters/secondary/authApiAdapter";
import { AxiosAdapter } from "@/modules/restApi/adapters/secondary/AxiosAdapter";
import { AuthClientAdapter } from "@/modules/auth/adapters/primary/authClientAdapter";
import { LoginUsecase } from "@/modules/auth/application/usecases/loginUsecase";
import { LogoutUsecase } from "@/modules/auth/application/usecases/logoutUsecase";
import { UserClientAdapter } from "@/modules/user/adapters/primary/userClientAdapter";
import { GetUserUsecase } from "@/modules/user/application/usecases/getUserUsecase";
import { UserApiAdapter } from "@/modules/user/adapters/secondary/userApiAdapter";
import { RequestResetPasswordUsecase } from "@/modules/auth/application/usecases/requestPasswordResetUsecase";

container.register(TYPES.RestApiPort, { useClass: AxiosAdapter });
container.register(TYPES.AuthApiPort, { useClass: AuthApiAdapter });
container.register(TYPES.UserApiPort, { useClass: UserApiAdapter });
container.register(TYPES.LoginUsecase, { useClass: LoginUsecase });
container.register(TYPES.LogoutUsecase, { useClass: LogoutUsecase });
container.register(TYPES.RequestResetPasswordUsecase, {
  useClass: RequestResetPasswordUsecase,
});
container.register(TYPES.AuthClientAdapter, { useClass: AuthClientAdapter });
container.register(TYPES.GetUserUsecase, { useClass: GetUserUsecase });
container.register(TYPES.UserClientAdapter, { useClass: UserClientAdapter });

export default container;
