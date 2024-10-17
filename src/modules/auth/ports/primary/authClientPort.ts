import { type LoginRequestDto } from "@/modules/auth/application/dtos/request.dto";
import { type LoginResponseDto } from "@/modules/auth/application/dtos/response.dto";

export interface AuthClientPort {
  login: ({ email, password }: LoginRequestDto) => Promise<LoginResponseDto>;
}
