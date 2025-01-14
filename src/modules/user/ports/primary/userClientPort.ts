import type {
  GetChinguMemberStatusResponseDto,
  GetUserResponseDto,
} from "@/modules/user/application/dtos/response.dto";
import { type GetUserRequestDto } from "@/modules/user/application/dtos/request.dtos";

export interface UserClientPort {
  getUser: () => Promise<GetUserResponseDto>;
  getChinguMemberStatus: (
    user: GetUserRequestDto,
  ) => GetChinguMemberStatusResponseDto;
}
