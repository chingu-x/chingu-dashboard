import { AuthApiAdapter } from "@/modules/auth/adapters/secondary/authApiAdapter";
import { type LoginRequestDto } from "@/modules/auth/application/dtos/request.dto";
import { type LoginResponseDto } from "@/modules/auth/application/dtos/response.dto";
import { LoginUsecase } from "@/modules/auth/application/usecases/loginUsecase";
import { type AuthClientPort } from "@/modules/auth/ports/primary/authClientPort";
import { AxiosAdapter } from "@/modules/restApi/adapters/secondary/AxiosAdapter";

const axiosAdapter = new AxiosAdapter();
const authApiPort = new AuthApiAdapter(axiosAdapter);

export class AuthClientAdapter implements AuthClientPort {
  async login({ email, password }: LoginRequestDto): Promise<LoginResponseDto> {
    const loginUsecase = new LoginUsecase(authApiPort);

    return await loginUsecase.execute({ email, password });
  }
}
