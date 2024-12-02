import type {
  RequestResetPasswordDto,
  LoginRequestDto,
} from "@/modules/auth/application/dtos/request.dto";
import type {
  LogoutResponseDto,
  LoginResponseDto,
} from "@/modules/auth/application/dtos/response.dto";

export interface AuthApiPort {
  login: ({ email, password }: LoginRequestDto) => Promise<LoginResponseDto>;
  logout: () => Promise<LogoutResponseDto>;
  requestResetPassword: ({ email }: RequestResetPasswordDto) => Promise<void>;
}
