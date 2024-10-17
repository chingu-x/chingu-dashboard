import axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { type PostParams } from "@/modules/restApi/application/entities/restApiParams";
import { type RestApiPort } from "@/modules/restApi/ports/secondary/restApiPort";

export class AxiosAdapter implements RestApiPort {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private failedRequestsQueue: Array<{
    resolve: (config: AxiosRequestConfig) => void;
    reject: (error: AxiosError) => void;
  }> = [];

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => this.handleErrorResponse(error),
    );
  }

  private async handleErrorResponse(error: AxiosError) {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (this.isRefreshing) {
        return new Promise((resolve, reject) => {
          this.failedRequestsQueue.push({ resolve, reject });
        })
          .then(() => this.axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      this.isRefreshing = true;

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`,
          {},
          { withCredentials: true },
        );

        this.processQueue(null);
        this.isRefreshing = false;

        return this.axiosInstance(originalRequest);
      } catch (err) {
        this.processQueue(err as AxiosError);
        this.isRefreshing = false;
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }

  private processQueue(
    error: AxiosError | null,
    config: AxiosRequestConfig | null = null,
  ) {
    this.failedRequestsQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else if (config) {
        prom.resolve(config);
      }
    });
    this.failedRequestsQueue = [];
  }

  // async get<T>(url: string): Promise<T> {
  //   const response = await this.axiosInstance.get<T>(url);
  //   return response.data;
  // }

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

  async post<X, Y>({ url, payload }: PostParams<X>): Promise<Y> {
    const response = await this.axiosInstance.post<X>(url, payload);
    return response.data as Promise<Y>;
  }
}
