import { container } from "tsyringe";

import { TYPES } from "./types";
import { type IdeationApiPort } from "@/modules/ideation/ports/secondary/ideationApiPort";
import { IdeationApiAdapter } from "@/modules/ideation/adapters/secondary/ideationApiAdapter";
import { type RestApiPort } from "@/modules/restApi/ports/secondary/restApiPort";
// import { NextJsRestApiAdapter } from "@/modules/restApi/adapters/secondary/nextJsRestApiAdapter";
import { type AuthApiPort } from "@/modules/auth/ports/secondary/authApiPort";
import { AuthApiAdapter } from "@/modules/auth/adapters/secondary/authApiAdapter";
import { AxiosAdapter } from "@/modules/restApi/adapters/secondary/AxiosAdapter";

container.register<IdeationApiPort>(TYPES.IdeationApiPort, {
  useClass: IdeationApiAdapter,
});

container.register<AuthApiPort>(TYPES.AuthApiPort, {
  useClass: AuthApiAdapter,
});

container.register<RestApiPort>(TYPES.RestApiPort, {
  useValue: new AxiosAdapter(),
});

export default container;
