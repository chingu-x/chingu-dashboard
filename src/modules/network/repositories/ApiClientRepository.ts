import { injectable } from "tsyringe";
import type {
  DeleteParams,
  GetParams,
  PatchParams,
  PostParams,
  SendRequestParams,
  UnauthPostParams,
} from "@/modules/network/domain/ApiParams";
import type { IApiClientRepository } from "@/modules/network/domain/repositories/IApiClientRepository";

@injectable()
export class ApiClientRepository implements IApiClientRepository {
  private async sendRequest<T, P>({
    method,
    baseUrl,
    url,
    token,
    cache,
    payload,
    tags,
  }: SendRequestParams<P>): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Cookie = token;
    }

    const options: RequestInit = {
      method,
      headers,
      cache,
      body: payload ? JSON.stringify(payload) : undefined,
      next: tags ? { tags: [tags] } : undefined,
    };

    const res = await fetch(`${baseUrl}/${url}`, options);

    if (!res.ok) {
      throw new Error(`Status code: ${res.status}, Message: ${res.statusText}`);
    }

    return (await res.json()) as T;
  }

  async GET<T>({ baseUrl, url, token, cache, tags }: GetParams): Promise<T> {
    return this.sendRequest<T, null>({
      method: "GET",
      baseUrl,
      url,
      token,
      cache,
      payload: undefined,
      tags,
    });
  }

  async POST<X, Y>({
    baseUrl,
    url,
    token,
    cache,
    payload,
  }: PostParams<X>): Promise<Y> {
    return this.sendRequest<Y, X>({
      method: "POST",
      baseUrl,
      url,
      token,
      cache,
      payload,
    });
  }

  async PATCH<X, Y>({
    baseUrl,
    url,
    token,
    cache,
    payload,
  }: PatchParams<X>): Promise<Y> {
    return this.sendRequest<Y, X>({
      method: "PATCH",
      baseUrl,
      url,
      token,
      cache,
      payload,
    });
  }

  async DELETE<X>({ baseUrl, url, token, cache }: DeleteParams): Promise<X> {
    return this.sendRequest<X, null>({
      method: "DELETE",
      baseUrl,
      url,
      token,
      cache,
    });
  }

  async UNAUTHPOST<X, Y>({
    baseUrl,
    url,
    cache,
    payload,
  }: UnauthPostParams<X>): Promise<Y> {
    return this.sendRequest<Y, X>({
      method: "POST",
      baseUrl,
      url,
      token: null,
      cache,
      payload,
    });
  }
}
