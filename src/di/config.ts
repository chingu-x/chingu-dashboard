import { container } from "tsyringe";

import { TYPES } from "./types";
import type { IApiClientRepository } from "@/modules/network/domain/repositories/IApiClientRepository";
import { ApiClientRepository } from "@/modules/network/repositories/ApiClientRepository";
import type { IIdeationService } from "@/modules/ideation/domain/services/IIdeationService";
import { IdeationService } from "@/modules/ideation/service/IdeationService";

/* Services */
container.register<IIdeationService>(TYPES.IdeationService, {
  useClass: IdeationService,
});

/* Repositories */
container.register<IApiClientRepository>(TYPES.ApiClientRepository, {
  useClass: ApiClientRepository,
});

export default container;
