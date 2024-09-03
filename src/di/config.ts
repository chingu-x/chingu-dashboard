import { container } from "tsyringe";

import { TYPES } from "./types";
import { type IdeationApiRepository } from "@/modules/ideation/domain/ports/ideationApiRepository";
import { NextJsRestApiRepository } from "@/modules/rest-api/infrastructure/adapters/nextJsRestApiRepository";
import { IdeationApiRepositoryImpl } from "@/modules/ideation/infrastructure/adapters/ideationApiRepositoryImpl";
import { type RestApiRepository } from "@/modules/rest-api/domain/ports/restApiRepository";

container.register<IdeationApiRepository>(TYPES.IdeationApiRepository, {
  useClass: IdeationApiRepositoryImpl,
});

container.register<RestApiRepository>(TYPES.RestApiRepository, {
  useClass: NextJsRestApiRepository,
});

export default container;
