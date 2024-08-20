import { injectable } from "tsyringe";
import type { IApiClient } from "@/modules/network/domain/IApiClient";

@injectable()
export class ApiClient implements IApiClient {
  private async sendRequest<T, P>(
    method: string,
    baseUrl: string,
    url: string,
    token: string | null,
    cache: RequestCache,
    payload?: P,
    tags?: string,
  ): Promise<T> {
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

  async GET<T>(
    baseUrl: string,
    url: string,
    token: string,
    cache: RequestCache,
    tags?: string,
  ): Promise<T> {
    return this.sendRequest<T, null>(
      "GET",
      baseUrl,
      url,
      token,
      cache,
      undefined,
      tags,
    );
  }

  async POST<X, Y>(
    baseUrl: string,
    url: string,
    token: string,
    cache: RequestCache,
    payload: X,
  ): Promise<Y> {
    return this.sendRequest<Y, X>("POST", baseUrl, url, token, cache, payload);
  }

  async PATCH<X, Y>(
    baseUrl: string,
    url: string,
    token: string,
    cache: RequestCache,
    payload: X,
  ): Promise<Y> {
    return this.sendRequest<Y, X>("PATCH", baseUrl, url, token, cache, payload);
  }

  async DELETE<X>(
    baseUrl: string,
    url: string,
    token: string,
    cache: RequestCache,
  ): Promise<X> {
    return this.sendRequest<X, null>("DELETE", baseUrl, url, token, cache);
  }

  async UNAUTHPOST<X, Y>(
    baseUrl: string,
    url: string,
    cache: RequestCache,
    payload: X,
  ): Promise<Y> {
    return this.sendRequest<Y, X>("POST", baseUrl, url, null, cache, payload);
  }
}
