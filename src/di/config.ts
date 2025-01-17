import { container } from "tsyringe";
import { TYPES } from "./types";
import { AuthApiAdapter } from "@/modules/auth/adapters/secondary/authApiAdapter";
import { AxiosAdapter } from "@/modules/rest-api/adapters/secondary/AxiosAdapter";
import { AuthClientAdapter } from "@/modules/auth/adapters/primary/authClientAdapter";
import { LoginUsecase } from "@/modules/auth/application/usecases/loginUsecase";
import { LogoutUsecase } from "@/modules/auth/application/usecases/logoutUsecase";
import { UserClientAdapter } from "@/modules/user/adapters/primary/userClientAdapter";
import { GetUserUsecase } from "@/modules/user/application/usecases/getUserUsecase";
import { UserApiAdapter } from "@/modules/user/adapters/secondary/userApiAdapter";
import { RequestResetPasswordUsecase } from "@/modules/auth/application/usecases/requestResetPasswordUsecase";
import { ResetPasswordUsecase } from "@/modules/auth/application/usecases/resetPasswordUsecase";
import { GetChinguMemberStatusUsecase } from "@/modules/user/application/usecases/getChinguMemberStatusUsecase";
import { VoyageTeamClientAdapter } from "@/modules/voyage-team/adapters/primary/voyageTeamClientAdapter";
import { GetCurrentVoyageTeamUsecase } from "@/modules/voyage-team/application/usecases/getCurrentVoyageTeamUsecase";
import { GetCurrentVoyageTeamIdUsecase } from "@/modules/voyage-team/application/usecases/getCurrentVoyageTeamIdUsecase";
import { HasVoyageStartedUsecase } from "@/modules/voyage-team/application/usecases/hasVoyageStartedUsecase";

container.register(TYPES.RestApiPort, { useClass: AxiosAdapter });
container.register(TYPES.AuthApiPort, { useClass: AuthApiAdapter });
container.register(TYPES.UserApiPort, { useClass: UserApiAdapter });
container.register(TYPES.LoginUsecase, { useClass: LoginUsecase });
container.register(TYPES.LogoutUsecase, { useClass: LogoutUsecase });
container.register(TYPES.RequestResetPasswordUsecase, {
  useClass: RequestResetPasswordUsecase,
});
container.register(TYPES.ResetPasswordUsecase, {
  useClass: ResetPasswordUsecase,
});
container.register(TYPES.AuthClientAdapter, { useClass: AuthClientAdapter });
container.register(TYPES.GetUserUsecase, { useClass: GetUserUsecase });
container.register(TYPES.GetChinguMemberStatusUsecase, {
  useClass: GetChinguMemberStatusUsecase,
});
container.register(TYPES.UserClientAdapter, { useClass: UserClientAdapter });
container.register(TYPES.VoyageTeamClientAdapter, {
  useClass: VoyageTeamClientAdapter,
});
container.register(TYPES.GetCurrentVoyageTeamUsecase, {
  useClass: GetCurrentVoyageTeamUsecase,
});
container.register(TYPES.GetCurrentVoyageTeamIdUsecase, {
  useClass: GetCurrentVoyageTeamIdUsecase,
});
container.register(TYPES.HasVoyageStartedUsecase, {
  useClass: HasVoyageStartedUsecase,
});

export default container;
