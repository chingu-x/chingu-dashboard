export interface SendRequestParams<P> {
  method: string;
  baseUrl: string;
  url: string;
  token: string | null;
  cache: RequestCache;
  payload?: P;
  tags?: string;
}

export interface GetParams {
  baseUrl: string;
  url: string;
  token: string;
  cache: RequestCache;
  tags?: string;
}

export interface PostParams<X> {
  baseUrl: string;
  url: string;
  token: string;
  cache: RequestCache;
  payload?: X;
}

export interface PatchParams<X> {
  baseUrl: string;
  url: string;
  token: string;
  cache: RequestCache;
  payload: X;
}

export interface DeleteParams {
  baseUrl: string;
  url: string;
  token: string;
  cache: RequestCache;
}

export interface UnauthPostParams<X> {
  baseUrl: string;
  url: string;
  cache: RequestCache;
  payload: X;
}
