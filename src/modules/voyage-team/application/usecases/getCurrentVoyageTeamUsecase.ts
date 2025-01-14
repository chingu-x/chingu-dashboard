import { injectable } from "tsyringe";
import { type GetUserRequestDto } from "@/modules/user/application/dtos/request.dtos";
import { type GetCurrentVoyageTeamResponseDto } from "@/modules/voyage-team/application/dtos/response.dto";

@injectable()
export class GetCurrentVoyageTeamUsecase {
  execute(
    user: GetUserRequestDto,
  ): GetCurrentVoyageTeamResponseDto | undefined {
    return user.voyageTeamMembers.find(
      (voyage) => voyage.voyageTeam.voyage.status.name === "Active",
    );
  }
}
