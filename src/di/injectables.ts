import { container } from "tsyringe";
import { TYPES } from "./types";
import { type LoginUsecase } from "@/modules/auth/application/usecases/loginUsecase";

export const injectables = {
  /*auth*/
  loginUsecase: container.resolve<LoginUsecase>(TYPES.LoginUsecase),
} as const;
