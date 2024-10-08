import { container } from "tsyringe";

import { TYPES } from "./types";
import { type IdeationApiPort } from "@/modules/ideation/ports/secondary/ideationApiPort";
import { IdeationApiAdapter } from "@/modules/ideation/adapters/secondary/ideationApiAdapter";
import { type RestApiPort } from "@/modules/restApi/ports/secondary/restApiPort";
import { NextJsRestApiAdapter } from "@/modules/restApi/adapters/secondary/nextJsRestApiAdapter";

container.register<IdeationApiPort>(TYPES.IdeationApiPort, {
  useClass: IdeationApiAdapter,
});

container.register<RestApiPort>(TYPES.RestApiPort, {
  useValue: new NextJsRestApiAdapter(process.env.NEXT_PUBLIC_API_URL!),
});

export default container;
