import type {
  DeleteParams,
  GetParams,
  PatchParams,
  PostParams,
  UnauthPostParams,
} from "@/modules/network/domain/ApiParams";

export interface IApiClientRepository {
  GET<T>(params: GetParams): Promise<T>;

  POST<X, Y>(params: PostParams<X>): Promise<Y>;

  PATCH<X, Y>(params: PatchParams<X>): Promise<Y>;

  DELETE<T>(params: DeleteParams): Promise<T>;

  UNAUTHPOST<X, Y>(params: UnauthPostParams<X>): Promise<Y>;
}
