import { injectable } from "tsyringe";
import { type GetChinguMemberStatusResponseDto } from "@/modules/user/application/dtos/response.dto";
import { type GetUserRequestDto } from "@/modules/user/application/dtos/request.dtos";

@injectable()
export class GetChinguMemberStatusUsecase {
  execute(user: GetUserRequestDto): GetChinguMemberStatusResponseDto {
    const data = user.voyageTeamMembers;
    if (data.length === 0) {
      return false;
    }
    return data.some(
      (member) => member.voyageTeam.voyage.status.name === "Active",
    );
  }
}
