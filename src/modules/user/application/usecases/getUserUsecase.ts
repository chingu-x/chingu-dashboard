import { inject, injectable } from "tsyringe";
import { TYPES } from "@/di/types";
import { type UserApiPort } from "@/modules/user/ports/secondary/userApiPort";
import { type GetUserResponseDto } from "@/modules/user/application/dtos/response.dto";
import { transformDateToUserTimezone } from "@/modules/user/application/utils/dateTransform";
import { currentDate } from "@/utils/getCurrentSprint";

@injectable()
export class GetUserUsecase {
  constructor(
    @inject(TYPES.UserApiPort)
    private readonly userApi: UserApiPort,
  ) {}

  async execute(): Promise<GetUserResponseDto> {
    const data = await this.userApi.getUser();

    // TODO: refactor later
    // need to move the current date to a module
    const userWithDate = {
      ...data,
      currentDateInUserTimezone: transformDateToUserTimezone(
        currentDate,
        data.timezone,
      ),
    };

    return userWithDate;
  }
}
