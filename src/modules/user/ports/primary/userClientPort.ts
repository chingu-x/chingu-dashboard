import { type GetUserResponseDto } from "@/modules/user/application/dtos/response.dto";

export interface UserClientPort {
  getUser: () => Promise<GetUserResponseDto>;
}
