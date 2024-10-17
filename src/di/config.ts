import { container } from "tsyringe";
import { TYPES } from "./types";
import { AuthApiAdapter } from "@/modules/auth/adapters/secondary/authApiAdapter";
import { AxiosAdapter } from "@/modules/restApi/adapters/secondary/AxiosAdapter";
import { AuthClientAdapter } from "@/app/(auth)/_adapters/authClientAdapter";
import { LoginUsecase } from "@/modules/auth/application/usecases/loginUsecase";

container.register(TYPES.RestApiPort, { useClass: AxiosAdapter });
container.register(TYPES.AuthApiPort, { useClass: AuthApiAdapter });
container.register(TYPES.LoginUsecase, { useClass: LoginUsecase });
container.register(TYPES.AuthClientAdapter, { useClass: AuthClientAdapter });

export default container;
