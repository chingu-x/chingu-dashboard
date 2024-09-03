import { container } from "tsyringe";

import { TYPES } from "./types";
import { type IdeationApiRepository } from "@/modules/ideation/domain/ports/ideationApiRepository";
import { NextJsRestApiRepository } from "@/modules/restApi/infrastructure/adapters/nextJsRestApiRepository";
import { IdeationApiRepositoryImpl } from "@/modules/ideation/infrastructure/adapters/ideationApiRepositoryImpl";
import { type RestApiRepository } from "@/modules/restApi/domain/ports/restApiRepository";
import { AddIdeationUseCase } from "@/modules/ideation/application/usecases/AddIdeationUseCase";

container.register<IdeationApiRepository>(TYPES.IdeationApiRepository, {
  useClass: IdeationApiRepositoryImpl,
});

container.register<RestApiRepository>(TYPES.RestApiRepository, {
  useValue: new NextJsRestApiRepository(process.env.NEXT_PUBLIC_API_URL!),
});

container.register<AddIdeationUseCase>(TYPES.AddIdeationUseCase, {
  useClass: AddIdeationUseCase,
});

export default container;
