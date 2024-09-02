import { container } from "tsyringe";

import { TYPES } from "./types";
import type { IRestApiRepository } from "@/modules/api/domain/repositories/IRestApiRepository";
import { RestApiRepository } from "@/modules/api/repositories/RestApiRepository";
import type { IIdeationService } from "@/modules/ideation/domain/services/IIdeationService";
import { IdeationService } from "@/modules/ideation/service/IdeationService";

/* Services */
container.register<IIdeationService>(TYPES.IIdeationService, {
  useClass: IdeationService,
});

/* Repositories */
container.register<IRestApiRepository>(TYPES.IApiClientRepository, {
  useClass: RestApiRepository,
});

export default container;
