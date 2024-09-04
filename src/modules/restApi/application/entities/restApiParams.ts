import { type RequestOptions } from "./requestOptions";

export interface GetParams {
  url: string;
  options: RequestOptions;
}

export interface PostParams<X> {
  url: string;
  options: RequestOptions;
  payload?: X;
}

export interface PatchParams<X> {
  url: string;
  options: RequestOptions;
  payload: X;
}

export interface DeleteParams {
  url: string;
  options: RequestOptions;
}

export interface UnauthPostParams<X> {
  url: string;
  options: RequestOptions;
  payload: X;
}
