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

/**
 * ApiClientRepository is a custom API client and is responsible for making HTTP requests.
 * It implements the IApiClientRepository interface.
 */
@injectable()
export class ApiClientRepository implements IApiClientRepository {
  /**
   * Sends an HTTP request to the specified URL with the given parameters.
   *
   * @template T - The expected response type.
   * @template P - The type of the payload.
   * @param {SendRequestParams<P>} params - The parameters for the request.
   * @returns {Promise<T>} - The response from the API.
   */
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

  /**
   * Sends a GET request to the specified URL.
   *
   * @template T - The expected response type.
   * @param {GetParams} params - The parameters for the GET request.
   * @returns {Promise<T>} - The response from the API.
   */
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

  /**
   * Sends a POST request to the specified URL.
   *
   * @template X - The type of the payload.
   * @template Y - The expected response type.
   * @param {PostParams<X>} params - The parameters for the POST request.
   * @returns {Promise<Y>} - The response from the API.
   */
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

  /**
   * Sends a PATCH request to the specified URL.
   *
   * @template X - The type of the payload.
   * @template Y - The expected response type.
   * @param {PatchParams<X>} params - The parameters for the PATCH request.
   * @returns {Promise<Y>} - The response from the API.
   */
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

  /**
   * Sends a DELETE request to the specified URL.
   *
   * @template X - The expected response type.
   * @param {DeleteParams} params - The parameters for the DELETE request.
   * @returns {Promise<X>} - The response from the API.
   */
  async DELETE<X>({ baseUrl, url, token, cache }: DeleteParams): Promise<X> {
    return this.sendRequest<X, null>({
      method: "DELETE",
      baseUrl,
      url,
      token,
      cache,
    });
  }

  /**
   * Sends an unauthenticated POST request to the specified URL.
   *
   * @template X - The type of the payload.
   * @template Y - The expected response type.
   * @param {UnauthPostParams<X>} params - The parameters for the unauthenticated POST request.
   * @returns {Promise<Y>} - The response from the API.
   */
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
