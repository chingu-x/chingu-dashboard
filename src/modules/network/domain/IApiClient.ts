export interface IApiClient {
  GET<T>(
    baseUrl: string,
    url: string,
    token: string,
    cache: RequestCache,
    tags?: string,
  ): Promise<T>;

  POST<X, Y>(
    baseUrl: string,
    url: string,
    token: string,
    cache: RequestCache,
    payload: X,
  ): Promise<Y>;

  PATCH<X, Y>(
    baseUrl: string,
    url: string,
    token: string,
    cache: RequestCache,
    payload: X,
  ): Promise<Y>;

  DELETE<T>(
    baseUrl: string,
    url: string,
    token: string,
    cache: RequestCache,
  ): Promise<T>;

  UNAUTHPOST<X, Y>(
    baseUrl: string,
    url: string,
    cache: RequestCache,
    payload: X,
  ): Promise<Y>;
}
