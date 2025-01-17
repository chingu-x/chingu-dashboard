import axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import type {
  DeleteParams,
  GetParams,
  PatchParams,
  PostParams,
} from "@/modules/rest-api/application/entities/restApiParams";
import { type RestApiPort } from "@/modules/rest-api/ports/secondary/restApiPort";

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

  async get<X>({ url }: GetParams): Promise<X> {
    const response = await this.axiosInstance.get<X>(url);
    return response.data;
  }

  async patch<X, Y>({ url, payload }: PatchParams<X>): Promise<Y> {
    const response = await this.axiosInstance.patch<Y>(url, payload);
    return response.data;
  }

  async delete<X>({ url }: DeleteParams): Promise<X> {
    const response = await this.axiosInstance.delete<X>(url);
    return response.data;
  }

  async post<X, Y>({ url, payload }: PostParams<X>): Promise<Y> {
    const response = await this.axiosInstance.post<Y>(url, payload);
    return response.data;
  }
}
