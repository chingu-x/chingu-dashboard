import type {
  RequestResetPasswordDto,
  LoginRequestDto,
  ResetPasswordDto,
} from "@/modules/auth/application/dtos/request.dto";
import type {
  LogoutResponseDto,
  LoginResponseDto,
} from "@/modules/auth/application/dtos/response.dto";

export interface AuthClientPort {
  login: (props: LoginRequestDto) => Promise<LoginResponseDto>;
  logout: () => Promise<LogoutResponseDto>;
  requestResetPassword: (props: RequestResetPasswordDto) => Promise<void>;
  resetPassword: (props: ResetPasswordDto) => Promise<void>;
}
