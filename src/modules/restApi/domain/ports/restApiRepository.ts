import type {
  DeleteParams,
  GetParams,
  PatchParams,
  PostParams,
  UnauthPostParams,
} from "@/modules/restApi/domain/entities/restApiParams";

export interface RestApiRepository {
  get<X>(params: GetParams): Promise<X>;

  post<X, Y>(params: PostParams<X>): Promise<Y>;

  patch<X, Y>(params: PatchParams<X>): Promise<Y>;

  delete<X>(params: DeleteParams): Promise<X>;

  unauthpost<X, Y>(params: UnauthPostParams<X>): Promise<Y>;
}
