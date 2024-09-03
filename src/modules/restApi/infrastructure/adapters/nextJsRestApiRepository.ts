import { type RestApiRepository } from "@/modules/restApi/domain/ports/restApiRepository";
import type {
  DeleteParams,
  PatchParams,
  PostParams,
  UnauthPostParams,
  GetParams,
} from "@/modules/restApi/domain/entities/restApiParams";
import { type RequestOptions } from "@/modules/restApi/domain/entities/requestOptions";

type NextJsAuthRequestOptions = Required<
  Pick<RequestOptions, "token" | "cache">
> &
  Omit<RequestOptions, "token" | "cache">;

type NextJsUnAuthRequestionOptions = Required<Pick<RequestOptions, "cache">> &
  Omit<RequestOptions, "cache">;

interface NextJsGetParams extends Omit<GetParams, "options"> {
  options: NextJsAuthRequestOptions; // Enforce required options
}

interface NextJsPostParams<X> extends Omit<PostParams<X>, "options"> {
  options: NextJsAuthRequestOptions; // Enforce required options
}

interface NextJsPatchParams<X> extends Omit<PatchParams<X>, "options"> {
  options: NextJsAuthRequestOptions; // Enforce required options
}

interface NextJsDeleteParams extends Omit<DeleteParams, "options"> {
  options: NextJsAuthRequestOptions; // Enforce required options
}

interface NextJsUnauthParams<X> extends Omit<UnauthPostParams<X>, "options"> {
  options: NextJsUnAuthRequestionOptions;
}

export class NextJsRestApiRepository implements RestApiRepository {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>({ url, options }: NextJsGetParams): Promise<T> {
    const { token, cache, tags } = options;

    const res = await fetch(`${this.baseUrl}/${url}`, {
      method: "GET",
      headers: {
        Cookie: token,
      },
      cache,
      next: {
        tags: [tags ?? ""],
      },
    });

    if (!res.ok) {
      throw new Error(`Status code: ${res.status}, Message: ${res.statusText}`);
    }

    return res.json() as Promise<T>;
  }

  async post<X, Y>({ url, options, payload }: NextJsPostParams<X>): Promise<Y> {
    const { token, cache } = options;

    const res = await fetch(`${this.baseUrl}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: token,
      },
      body: payload ? JSON.stringify(payload) : undefined,
      cache,
    });

    if (!res.ok) {
      throw new Error(`Status code: ${res.status}, Message: ${res.statusText}`);
    }

    return res.json() as Promise<Y>;
  }

  async patch<X, Y>({
    url,
    options,
    payload,
  }: NextJsPatchParams<X>): Promise<Y> {
    const { token, cache } = options;

    const res = await fetch(`${this.baseUrl}/${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: token,
      },
      body: JSON.stringify(payload),
      cache,
    });

    if (!res.ok) {
      throw new Error(`Status code: ${res.status}, Message: ${res.statusText}`);
    }

    return res.json() as Promise<Y>;
  }

  async delete<X>({ url, options }: NextJsDeleteParams): Promise<X> {
    const { token, cache } = options;

    const res = await fetch(`${this.baseUrl}/${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: token,
      },
      cache,
    });

    if (!res.ok) {
      throw new Error(`Status code: ${res.status}, Message: ${res.statusText}`);
    }

    return res.json() as Promise<X>;
  }

  async unauthpost<X, Y>({
    url,
    options,
    payload,
  }: NextJsUnauthParams<X>): Promise<Y> {
    const { cache } = options;

    const res = await fetch(`${this.baseUrl}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache,
    });

    if (!res.ok) {
      throw new Error(`Status code: ${res.status}, Message: ${res.statusText}`);
    }

    return res.json() as Promise<Y>;
  }
}
