import type {
  DeleteParams,
  GetParams,
  PatchParams,
  PostParams,
  UnauthPostParams,
} from "@/modules/rest-api/domain/entities/restApiParams";

export interface RestApiRepository {
  get<T>(params: GetParams): Promise<T>;

  post<X, Y>(params: PostParams<X>): Promise<Y>;

  patch<X, Y>(params: PatchParams<X>): Promise<Y>;

  delete<T>(params: DeleteParams): Promise<T>;

  unauthpost<X, Y>(params: UnauthPostParams<X>): Promise<Y>;
}
