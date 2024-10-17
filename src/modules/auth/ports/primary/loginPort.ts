import { type LoginRequestDto } from "@/modules/auth/application/dtos/request.dto";
import { type LoginResponseDto } from "@/modules/auth/application/dtos/response.dto";

export interface LoginPort {
  execute(props: LoginRequestDto): Promise<LoginResponseDto>;
}
